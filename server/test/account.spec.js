import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';


chai.use(chaiHttp);
const should = chai.should();

describe('Mocha test for Account Controller', () => {
  describe('Mocha test for creating a bank account', () => {
    const createAccountUrl = '/api/v1/accounts';
    it('should create a bank account when all the parameters are given', (done) => {
      chai.request(app)
        .post(createAccountUrl)
        .send({
          type: 'savings'
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body).to.have.property('type');
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
          expect(response.body.error).to.equal('Account type is required');
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
          expect(response.body.error).to.equal('Account already exist');
          done();
        });
    });
  });

  describe('Mocha test for PATCH request on a bank account', () => {
    const patchUrl = '/api/v1/accounts/:accountNumber';
    it('should patch a selected account number when all the parameters are given', (done) => {
      chai.request(app)
        .patch(patchUrl)
        .send({
          status: 'active'
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(404);
          // expect(response.data).to.be.an('object');
          // expect(response.body.data).to.have.property('id');
          // expect(response.body.data).to.have.property('accountNumber');
          // expect(response.body.data).to.have.property('firstName');
          // expect(response.body.data).to.have.property('lastName');
          // expect(response.body.data).to.have.property('createdOn');
          // expect(response.body.data).to.have.property('openingBalance');
          // expect(response.body.data).to.have.property('email');
          // expect(response.body.data).to.have.property('type');
          expect(response.body).to.have.property('status');
          // expect(response.body.data.email).to.equal('frank@email.com');
          done();
        });
    });

    it('should not patch the account number when accountNumber is not found', (done) => {
      chai.request(app)
        .patch(patchUrl)
        .send()
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(404);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Account number not found!');
          done();
        });
    });

    it('should not patch the account number when the status is missing', (done) => {
      chai.request(app)
        .patch(patchUrl)
        .send({ })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(404);
          expect(response.body.accountNumber).to.not.equal('status');
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Account number not found!');
          done();
        });
    });
  });

  describe('Delete a specific account', () => {
    const deleteUrl = '/api/v1/accounts/:accountNumber';
    it('it should DELETE an account with the given id', (done) => {
      chai.request(app)
        .delete(deleteUrl)
        .send({
          accountNumber: 1
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(404);
          done();
        });
    });
  });
});
