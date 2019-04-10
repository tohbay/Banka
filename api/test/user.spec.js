import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';


chai.use(chaiHttp);
const should = chai.should();

describe('Mocha test for User Controller', () => {
  describe('Mocha test for user signup route', () => {
    const signupUrl = '/api/v1/auth/signup';
    it(
      'should register a new user when all the parameters are given',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            id: 1,
            email: 'frank@email.com',
            firstName: 'Frank',
            lastName: 'Obi',
            password: '12345',
            type: 'client',
            isAdmin: false
          })
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response).to.have.status(201);
            expect(response.body.status).to.equal(201);
            expect(response.body.data).to.be.a('object');
            expect(response.body.data).to.have.property('id');
            expect(response.body.data).to.have.property('firstName');
            expect(response.body.data).to.have.property('lastName');
            expect(response.body.data).to.have.property('email');
            expect(response.body.data.email).to.equal('frank@email.com');
            done();
          });
      },
    );

    it('should not register a user when the email is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          id: 1,
          firstName: 'Frank',
          lastName: 'Obi',
          password: '12345',
          type: 'client',
          isAdmin: false
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Email is required');
          done();
        });
    });

    it('should not register a user when the first name is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          id: 1,
          email: 'frank@email.com',
          lastName: 'Obi',
          password: '12345',
          type: 'client',
          isAdmin: false
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('First name is required');
          done();
        });
    });


    it('should not register a user when the last name is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          id: 1,
          email: 'frank@email.com',
          firstName: 'Frank',
          password: '12345',
          type: 'client',
          isAdmin: false
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Last name is required');
          done();
        });
    });

    it('should not register a user when the password is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          id: 1,
          email: 'frank@email.com',
          firstName: 'Frank',
          lastName: 'Obi',
          type: 'client',
          isAdmin: false
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Password is required');
          done();
        });
    });

    it('should not register a user when the email already exist', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          id: 1,
          email: 'frank@email.com',
          firstName: 'Frank',
          lastName: 'Obi',
          password: '12345',
          type: 'client',
          isAdmin: false
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Email already exist');
          done();
        });
    });
  });
});
