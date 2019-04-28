import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

const should = chai.should();
chai.use(chaiHttp);
const request = chai.request(app);

describe('Mocha test for User Controller', () => {
  const newUser = {
    id: 1,
    email: 'frank@email.com',
    firstName: 'Frank',
    lastName: 'Obi',
    password: '12345',
    confirmPassword: '12345',
    type: 'client',
    isAdmin: false
  };
  describe('Mocha test for user signup route', () => {
    const signupUrl = '/api/v2/auth/signup/';
    it('should create a new user when all parameters are given', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({ newUser })
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.have.property('status');
          expect(response.body).to.have.property('error');
          expect(newUser).to.be.an('object');
          expect(newUser).to.have.property('id');
          expect(newUser).to.have.property('email');
          expect(newUser).to.have.property('firstName');
          expect(newUser).to.have.property('lastName');
          expect(newUser).to.have.property('password');
          expect(newUser).to.have.property('type');
          expect(newUser).to.have.property('isAdmin');
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
          expect(response.status).to.equal(400);
          expect(newUser).to.have.property('id');
          expect(newUser).to.have.property('email');
          expect(newUser).to.have.property('firstName');
          expect(newUser).to.have.property('lastName');
          expect(newUser).to.have.property('password');
          expect(newUser).to.have.property('type');
          expect(newUser).to.have.property('isAdmin');
          done();
        });
    });
  });

  describe('Mocha test for user signin route', () => {
    const signinUrl = '/api/v2/auth/signin/';
    it('should signin an existing user when all the parameters are incorrect', (done) => {
      const existingUser = {
        id: 1,
        email: 'frank@email.com',
        firstName: 'Frank',
        lastName: 'Obi',
        password: '12345',
        type: 'client',
        isAdmin: false
      };
      chai.request(app)
        .post(signinUrl)
        .send({ existingUser })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          expect(existingUser).to.have.property('id');
          expect(existingUser).to.have.property('email');
          expect(existingUser).to.have.property('firstName');
          expect(existingUser).to.have.property('lastName');
          expect(existingUser).to.have.property('password');
          expect(existingUser).to.have.property('type');
          expect(existingUser).to.have.property('isAdmin');
          done();
        });
    });
  });
});
