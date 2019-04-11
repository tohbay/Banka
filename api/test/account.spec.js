import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';


chai.use(chaiHttp);
const should = chai.should();

describe('Mocha test for Account Controller', () => {
  describe('Mocha test for creating a bank account', () => {
    const createAccountUrl = '/api/v1/accounts';
    it('should register a new user when all the parameters are given', (done) => {
      chai.request(app)
        .post(createAccountUrl)
        .send({
          type: 'savings' || 'current',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(201);
          expect(response.body.status).to.equal(201);
          expect(response.data).to.be.an('object');
          expect(response.body.data).to.have.property('id');
          expect(response.body.data).to.have.property('accountNumber');
          expect(response.body.data).to.have.property('firstName');
          expect(response.body.data).to.have.property('lastName');
          expect(response.body.data).to.have.property('createdOn');
          expect(response.body.data).to.have.property('openingBalance');
          expect(response.body.data).to.have.property('email');
          expect(response.body.data).to.have.property('type');
          expect(response.body.data.email).to.equal('frank@email.com');
          console.log(response.body);
          done();
        });
    });

    it('should not create a bank account when the type is missing', (done) => {
      chai.request(app)
        .post(createAccountUrl)
        .send({

        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Email is required');
          done();
        });
    });

    it('should not create an account when accountNumber already exist', (done) => {
      chai.request(app)
        .post(createAccountUrl)
        .send({
          id: 1,
          accountNumber: 1,
          createdOn: Date.now(),
          owner: 1,
          type: 'savings',
          status: 'draft',
          openingBalance: 0.00
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('First name is required');
          done();
        });
    });
  });

  describe('Mocha test for PATCH request on a bank account', () => {
    const patchUrl = '/api/v1/accounts/:accountNumber';
    it('should patch a selected account number when all the parameters are given', (done) => {
      chai.request(app)
        .post(patchUrl)
        .send({
          status: 'active' || 'dormant',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(201);
          expect(response.body.status).to.equal(201);
          expect(response.data).to.be.an('object');
          expect(response.body.data).to.have.property('id');
          expect(response.body.data).to.have.property('accountNumber');
          expect(response.body.data).to.have.property('firstName');
          expect(response.body.data).to.have.property('lastName');
          expect(response.body.data).to.have.property('createdOn');
          expect(response.body.data).to.have.property('openingBalance');
          expect(response.body.data).to.have.property('email');
          expect(response.body.data).to.have.property('type');
          expect(response.body.data).to.have.property('status');
          expect(response.body.data.email).to.equal('frank@email.com');
          console.log(response.body);
          done();
        });
    });

    it('should not patch the account number when the status is missing', (done) => {
      chai.request(app)
        .post(createAccountUrl)
        .send({

        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Email is required');
          done();
        });
    });

    it('should not patch the account number when accountNumber does not exist', (done) => {
      chai.request(app)
        .post(createAccountUrl)
        .send({ })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('First name is required');
          done();
        });
    });
  });
});
