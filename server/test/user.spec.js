import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';


const should = chai.should();
chai.use(chaiHttp);
const request = chai.request(app);

describe('Mocha test for User Controller', () => {
  describe('Mocha test for user signup route', () => {
    const signupUrl = '/api/v2/auth/signup/';
    it('should not create a new user if there is no token provided', (done) => {
      const newAccount = {
        email: 'frank@email.com',
        firstName: 'Frank',
        lastName: 'Obi',
        password: '12345',
        confirmPassword: '12345'
      };
      chai.request(app)
        .post(signupUrl)
        .send({ newAccount })
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.have.property('status');
          expect(response.body).to.have.property('error');
          done();
        });
    });

    it('should not register a user when the email already exist', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          id: 4,
          email: 'Donfrank@email.com',
          firstName: 'Frank',
          lastName: 'Obi',
          password: '12345',
          type: 'client',
          isAdmin: false
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(400);
          done();
        });
    });
  });

  describe('Mocha test for user signin route', () => {
    const signinUrl = '/api/v2/auth/signin/';
    it('should not signin an existing user when all the parameters are incorrect', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'Donfrank@email.com',
          password: '12345',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('error');
          done();
        });
    });
  });
});
