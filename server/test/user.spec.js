import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';


chai.use(chaiHttp);
const should = chai.should();

describe('Mocha test for User Controller', () => {
  describe('Mocha test for user signup route', () => {
    const signupUrl = '/api/v1/auth/signup';
    it('should create a new user when all the parameters are given', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          email: 'John@email.com',
          firstName: 'John',
          lastName: 'Doe',
          password: 'freedom',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(201);
          expect(response.body.status).to.equal(201);
          expect(response.body.data).to.have.property('email');
          expect(response.body.data).to.have.property('firstName');
          expect(response.body.data).to.have.property('lastName');
          expect(response.body.data).to.have.property('password');
          console.log(response.body);
          done();
        });
    });

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
          expect(response.body.error).to.equal('User already exist');
          done();
        });
    });
  });

  describe('Mocha test for user signin route', () => {
    const signinUrl = '/api/v1/auth/signin';
    it('should signin an existing user when all the parameters are given', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'frank@email.com',
          password: '12345',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(201);
          expect(response.body.status).to.equal(201);
          expect(response.body.data).to.be.an('object');
          expect(response.body.data).to.have.property('email');
          expect(response.body.data.email).to.equal('frank@email.com');
          console.log(response.body);
          done();
        });
    });

    it('should not register a user when the email is missing', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          password: '12345',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Email is required');
          done();
        });
    });

    it('should not register a user when the password is missing', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'frank@email.com',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Password is required');
          done();
        });
    });
  });
});
