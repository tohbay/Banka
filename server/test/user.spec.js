import chai from 'chai';
import 'chai/register-should';
import chaiHttp from 'chai-http';

import app from '../app';


chai.use(chaiHttp);
const should = chai.should();

const request = chai.request(app);


describe('Test user login and signup', () => {
  beforeEach((done) => {
    done();
  });
  afterEach((done) => {
    done();
  });
  describe('POST /auth/signup', () => {
    it('it should create a new user', (done) => {
      const newUser = {
        email: 'johndoelo@gmail.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'password',
        confirmPassword: 'password',
      };
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send(newUser)
        .end((err, response) => {
          response.should.have.status(409);
          response.body.should.be.a('object');
          done();
        });
    });

    it('it should throw an error if the email address is already taken', (done) => {
      const newUser = {
        email: 'johndoelo@gmail.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'password',
        confirmPassword: 'password',
      };

      chai
        .request(app)
        .post('/api/v2/auth/signup')
        .send(newUser)
        .end((err, response) => {
          response.should.have.status(409);
          response.body.should.be.a('object');
          response.body.should.have.property('error').eql('User already exist');
          done();
        });
    });

    it('it should throw an error if firstName is missing in the request body', (done) => {
      const invalidPayload = {
        lastName: 'John',
        email: 'johndoe@gmail.com',
        password: 'password',
        confirmPassword: 'password',
      };

      chai
        .request(app)
        .post('/api/v2/auth/signup')
        .send(invalidPayload)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a('object');
          response.body.should.have.property('error').eql('Ensure all fields are provided');
          done();
        });
    });

    it('it should throw an error if lastName is missing in the request body', (done) => {
      const invalidPayload = {
        firstName: 'John',
        email: 'johndoe@gmail.com',
        password: 'password',
        confirmPassword: 'password',
      };

      chai
        .request(app)
        .post('/api/v2/auth/signup')
        .send(invalidPayload)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a('object');
          response.body.should.have.property('error').eql('Ensure all fields are provided');
          done();
        });
    });

    it('it should throw an error if email is missing in the request body', (done) => {
      const invalidPayload = {
        firstName: 'John',
        lastName: 'Doe',
        password: 'password',
        confirmPassword: 'password',
      };

      chai
        .request(app)
        .post('/api/v2/auth/signup')
        .send(invalidPayload)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a('object');
          response.body.should.have.property('error').eql('Ensure all fields are provided');
          done();
        });
    });

    it('it should throw an error if password does not match confirm password', (done) => {
      const invalidPayload = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        password: 'password',
        confirmPassword: 'passw',
      };

      chai
        .request(app)
        .post('/api/v2/auth/signup')
        .send(invalidPayload)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a('object');
          response.body.should.have.property('error').eql('Passwords do not match');
          done();
        });
    });
  });


  describe('POST /auth/signin', () => {
    it('it should sign in a user', (done) => {
      const loginCredential = {
        email: 'johndoe@gmail.com',
        password: 'password',
      };
      chai
        .request(app)
        .post('/api/v2/auth/signin')
        .send(loginCredential)
        .end((err, response) => {
          response.body.should.be.a('object');
          response.body.should.have.property('error').eql('Account does not exist');
          response.should.have.status(400);
          done();
        });
    });

    it('it should throw an error if email is missing in the rquest body', (done) => {
      const loginCredential = {
        password: 'password',
      };

      chai
        .request(app)
        .post('/api/v2/auth/signin')
        .send(loginCredential)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a('object');
          response.body.should.have.property('error').eql('Email or Password is not provided');
          done();
        });
    });


    it('it should throw an error if password is missing in the rquest body', (done) => {
      const loginCredential = {
        email: 'johndoe@gmail.com',
      };

      chai
        .request(app)
        .post('/api/v2/auth/signin')
        .send(loginCredential)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a('object');
          response.body.should.have.property('error').eql('Email or Password is not provided');
          done();
        });
    });
  });
});
