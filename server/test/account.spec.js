import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';


chai.use(chaiHttp);
const should = chai.should();

describe('Mocha test for Account Controller', () => {
  const newAccount = {
    id: 4,
    accountNumber: 4,
    email: 'JohnMark@email.com',
    firstName: 'Mark',
    lastName: 'James',
    createdOn: new Date().toLocaleString(),
    owner: 3,
    type: 'savings',
    status: 'active',
    balance: 0.00
  };
  describe('Mocha test for creating a bank account', () => {
    const createAccountUrl = '/api/v2/accounts';
    it('should create a bank account when all the parameters are given', (done) => {
      chai.request(app)
        .post(createAccountUrl)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(403);
          expect(response.body.error).to.be.a('string');
          expect(newAccount).to.have.property('id');
          expect(newAccount.accountNumber).to.equal(4);
          expect(newAccount).to.have.property('email');
          expect(newAccount).to.have.property('firstName');
          expect(newAccount).to.have.property('lastName');
          expect(newAccount).to.have.property('createdOn');
          expect(newAccount).to.have.property('balance');
          expect(newAccount).to.have.property('status').to.equal('active');
          expect(newAccount).to.have.property('type');
          done();
        });
    });

    it('should not create a bank account when the type is missing', (done) => {
      const newAccount = {
        id: 4,
        accountNumber: 4,
        email: 'JohnMark@email.com',
        firstName: 'Mark',
        lastName: 'James',
        createdOn: new Date().toLocaleString(),
        owner: 3,
        type: 'savings',
        status: 'active',
        balance: 0.00
      };
      chai.request(app)
        .post(createAccountUrl)
        .send({ })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(403);
          expect(response.body.error).to.be.a('string');
          expect(newAccount).to.have.property('id');
          expect(newAccount).to.have.property('email');
          expect(newAccount).to.have.property('firstName');
          expect(newAccount).to.have.property('lastName');
          expect(newAccount).to.have.property('createdOn');
          expect(newAccount).to.have.property('balance');
          expect(newAccount).to.have.property('status').to.equal('active');
          done();
        });
    });
  });

  describe('Mocha test for PATCH request on a bank account', () => {
    const patchUrl = '/api/v2/accounts/:accountNumber';
    it('should patch a selected account number when all the parameters are given', (done) => {
      chai.request(app)
        .patch(patchUrl)
        .send({
          status: 'active'
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(403);
          expect(response.body).to.have.property('status');
          expect(newAccount).to.have.property('id');
          expect(newAccount).to.have.property('email');
          expect(newAccount).to.have.property('firstName');
          expect(newAccount).to.have.property('lastName');
          expect(newAccount).to.have.property('createdOn');
          expect(newAccount).to.have.property('balance');
          expect(newAccount).to.have.property('status').to.equal('active');
          expect(newAccount.status).to.equal('active');
          expect(newAccount.accountNumber).to.equal(4);
          done();
        });
    });

    it('should not patch the account number when accountNumber is not found', (done) => {
      chai.request(app)
        .patch(patchUrl)
        .send()
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(403);
          expect(response.body.error).to.be.a('string');
          expect(newAccount).to.have.property('id');
          expect(newAccount).to.have.property('email');
          expect(newAccount).to.have.property('firstName');
          expect(newAccount).to.have.property('lastName');
          expect(newAccount).to.have.property('createdOn');
          expect(newAccount).to.have.property('balance');
          expect(newAccount).to.have.property('status').to.equal('active');
          expect(newAccount.status).to.equal('active');
          expect(response.body.error).to.equal('Access denied, Provide authorization');
          done();
        });
    });

    it('should not patch the account number when the status is missing', (done) => {
      chai.request(app)
        .patch(patchUrl)
        .send({
          id: 3,
          accountNumber: 3,
          email: 'mark@email.com',
          firstName: 'Mark',
          lastName: 'James',
          createdOn: new Date().toLocaleString(),
          owner: 3,
          type: 'current',
          balance: 1000000.78
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(403);
          expect(response.body.error).to.be.a('string');
          expect(response.body.accountNumber).to.not.equal('status');
          expect(response.body.error).to.be.a('string');
          expect(newAccount).to.have.property('id');
          expect(newAccount).to.have.property('email');
          expect(newAccount).to.have.property('firstName');
          expect(newAccount).to.have.property('lastName');
          expect(newAccount).to.have.property('createdOn');
          expect(newAccount).to.have.property('balance');
          expect(newAccount).to.have.property('status').to.equal('active');
          expect(newAccount.status).to.equal('active');
          expect(response.body.error).to.equal('Access denied, Provide authorization');
          done();
        });
    });
  });

  describe('Get All accounts', () => {
    it('it should GET all the accounts', (done) => {
      chai.request(app)
        .get('/api/v2/accounts')
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(403);
          expect(response.body.error).to.be.a('string');
          expect(newAccount).to.have.property('id');
          expect(newAccount).to.have.property('email');
          expect(newAccount).to.have.property('firstName');
          expect(newAccount).to.have.property('lastName');
          expect(newAccount).to.have.property('createdOn');
          expect(newAccount).to.have.property('balance');
          expect(newAccount).to.have.property('status').to.equal('active');
          expect(newAccount.status).to.equal('active');
          done();
        });
    });

    it('it should GET a account by the given id', (done) => {
      chai.request(app)
        .get('/api/v2/accounts/:id')
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(403);
          expect(response.body.error).to.be.a('string');
          expect(newAccount).to.have.property('id');
          expect(newAccount).to.have.property('email');
          expect(newAccount).to.have.property('firstName');
          expect(newAccount).to.have.property('lastName');
          expect(newAccount).to.have.property('createdOn');
          expect(newAccount).to.have.property('balance');
          expect(newAccount).to.have.property('status').to.equal('active');
          done();
        });
    });
  });

  describe('Delete a specific account', () => {
    const deleteUrl = '/api/v2/accounts/:accountNumber';
    it('it should DELETE an account with the given id', (done) => {
      chai.request(app)
        .delete(deleteUrl)
        .send({
          accountNumber: 1
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(403);
          expect(response.body.error).to.be.a('string');
          expect(newAccount).to.have.property('id');
          expect(newAccount).to.have.property('email');
          expect(newAccount).to.have.property('firstName');
          expect(newAccount).to.have.property('lastName');
          expect(newAccount).to.have.property('createdOn');
          expect(newAccount).to.have.property('balance');
          expect(newAccount).to.have.property('status').to.equal('active');
          expect(newAccount.status).to.equal('active');
          expect(newAccount.accountNumber).to.equal(4);
          done();
        });
    });
  });

  describe('Get All accounts by status', () => {
    it('it should GET all the dormant accounts', (done) => {
      chai.request(app)
        .get('/api/v2/accounts/status/dormant')
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(403);
          expect(newAccount).to.have.property('id');
          expect(newAccount).to.have.property('email');
          expect(newAccount).to.have.property('firstName');
          expect(newAccount).to.have.property('lastName');
          expect(newAccount).to.have.property('createdOn');
          expect(newAccount).to.have.property('balance');
          expect(newAccount).to.have.property('status');
          done();
        });
    });

    it('it should GET all the active accounts', (done) => {
      chai.request(app)
        .get('/api/v2/accounts/status/active')
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(403);
          expect(newAccount).to.have.property('id');
          expect(newAccount).to.have.property('email');
          expect(newAccount).to.have.property('firstName');
          expect(newAccount).to.have.property('lastName');
          expect(newAccount).to.have.property('createdOn');
          expect(newAccount).to.have.property('balance');
          expect(newAccount).to.have.property('status');
          expect(newAccount).to.have.property('status').to.equal('active');
          done();
        });
    });
  });

  describe('GET all accounts owned by a specific account', () => {
    it('it should GET all accounts owned by a specific account with a given email', (done) => {
      chai.request(app)
        .get('/api/v2/accounts/user/:email')
        .send({
          accountNumber: 1
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(403);
          expect(response.body.error).to.be.a('string');
          expect(newAccount).to.have.property('id');
          expect(newAccount).to.have.property('email');
          expect(newAccount).to.have.property('createdOn');
          expect(newAccount).to.have.property('balance');
          expect(newAccount).to.have.property('status');
          expect(newAccount).to.have.property('accountNumber');
          done();
        });
    });
  });
});
