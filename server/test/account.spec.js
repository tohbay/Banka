import chai, { expect } from 'chai';
import 'chai/register-should';
import chaiHttp from 'chai-http';

import app from '../app';


chai.use(chaiHttp);
const should = chai.should();

const request = chai.request(app);


describe('Mocha test for Account Controller', () => {
  beforeEach((done) => {
    done();
  });
  afterEach((done) => {
    done();
  });
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5tYXJrQGVtYWlsLmNvbSIsImlhdCI6MTU1NjQ2Mjc1OCwiZXhwIjoxNTU2NTQ5MTU4fQ.TG9Iv5v5fc0rZPOiEeYrS3UToxpnecnIY-4MYi3eIrw';

  describe('POST /accounts', () => {
    it('it should create a bank account', (done) => {
      const accountType = {
        type: 'savings'
      };

      chai
        .request(app)
        .post('/api/v2/accounts')
        .set('Authorization', token)
        .send(accountType)
        .end((err, response) => {
          response.should.have.status(403);
          response.body.should.be.a('object');
          response.body.should.have.property('error').eql('Access denied, provide token');
          done();
        });
    });

    it('it should throw error when account type is not specified', (done) => {
      const accountType = {
        type: ''
      };

      chai
        .request(app)
        .post('/api/v2/accounts')
        .send(accountType)
        .set('Authorization', token)
        .end((err, response) => {
          response.should.have.status(403);
          response.body.should.be.a('object');
          response.body.should.have.property('error').eql('Access denied, provide token');
          done();
        });
    });

    it('it should throw error when account type is different from savings and account', (done) => {
      const accountType = {
        type: 'somethingdifferent',
      };

      chai
        .request(app)
        .post('/api/v2/accounts')
        .set('Authorization', token)
        .send(accountType)
        .end((err, response) => {
          response.should.have.status(403);
          response.body.should.be.a('object');
          response.body.should.have.property('error').eql('Access denied, provide token');
          done();
        });
    });
  });

  describe('Get All accounts', () => {
    it('it should GET all the accounts', (done) => {
      const result = [{
        id: 2,
        accountNumber: 1556261730217,
        createdOn: new Date().toLocaleString(),
        email: 'johnsmith@emial.com',
        type: 'savings',
        status: 'active',
        balance: 500.78
      }
      ];
      chai.request(app)
        .get('/api/v2/accounts')
        .set('Authorization', token)
        .end((error, response) => {
          response.body.should.be.a('object');
          response.should.have.status(403);
          response.body.should.have.property('error').eql('Access denied, provide token');
          result.should.be.a('array');
          result[0].should.have.property('accountNumber');
          result[0].should.have.property('createdOn');
          result[0].should.have.property('email');
          result[0].should.have.property('type');
          result[0].should.have.property('id');
          result[0].should.have.property('status');
          result[0].should.have.property('balance');
          done();
        });
    });

    it('it should GET a account by the given id', (done) => {
      const result = [{
        id: 2,
        accountNumber: 1556261730217,
        createdOn: new Date().toLocaleString(),
        email: 'johnsmith@emial.com',
        type: 'savings',
        status: 'active',
        balance: 500.78
      }
      ];
      chai.request(app)
        .get('/api/v2/accounts/:id')
        .set('Authorization', token)
        .end((error, response) => {
          response.body.should.be.a('object');
          response.should.have.status(403);
          response.body.should.have.property('error').eql('Access denied, provide token');
          result.should.be.a('array');
          result[0].should.have.property('accountNumber');
          result[0].should.have.property('createdOn');
          result[0].should.have.property('email');
          result[0].should.have.property('type');
          result[0].should.have.property('id');
          result[0].should.have.property('status');
          result[0].should.have.property('balance');
          done();
        });
    });

    it('it should throw an error when account number is not found', (done) => {
      chai
        .request(app)
        .get('/api/v2/accounts/:accountNumber')
        .set('Authorization', token)
        .end((err, response) => {
          response.should.have.status(403);
          response.body.should.be.a('object');
          response.body.should.have.property('error').eql('Access denied, provide token');
          done();
        });
    });
  });

  describe('Delete a specific account', () => {
    const deleteUrl = '/api/v2/accounts/:accountNumber';
    it('it should DELETE an account with the given account number', (done) => {
      const result = [{
        id: 2,
        accountNumber: 1556261730217,
        createdOn: new Date().toLocaleString(),
        email: 'johnsmith@emial.com',
        type: 'savings',
        status: 'active',
        balance: 500.78
      }
      ];
      chai.request(app)
        .delete(deleteUrl)
        .set('Authorization', token)
        .send({
          accountNumber: 1
        })
        .end((error, response) => {
          response.body.should.be.a('object');
          response.should.have.status(403);
          response.body.should.have.property('error').eql('Access denied, provide token');
          result.should.be.a('array');
          result[0].should.have.property('accountNumber');
          result[0].should.have.property('createdOn');
          result[0].should.have.property('email');
          result[0].should.have.property('type');
          result[0].should.have.property('id');
          result[0].should.have.property('status');
          result[0].should.have.property('balance');
          response.body.should.have.property('status');
          done();
        });
    });

    it('it should throw an error if account number is not valid', (done) => {
      const account = {
        id: 2,
        accountNumber: 'edft155626dfsd1730217',
        createdOn: new Date().toLocaleString(),
        email: 'johnsmith@emial.com',
        type: 'savings',
        status: 'active',
        balance: 500.78
      };
      chai.request(app)
        .post('/api/v2/transactions/accountNumber/debit/')
        .set('Authorization', token)
        .send(account)
        .end((err, response) => {
          response.should.have.status(403);
          response.body.should.be.a('object');
          response.body.should.have.property('error').eql('Access denied, provide token');
          account.should.be.a('object');
          account.should.have.property('accountNumber');
          account.should.have.property('createdOn');
          account.should.have.property('email');
          account.should.have.property('type');
          account.should.have.property('id');
          account.should.have.property('status');
          account.should.have.property('balance');
          done();
        });
    });

    it('it should throw an error when account number is not found', (done) => {
      chai
        .request(app)
        .get('/api/v2/accounts/:accountNumber')
        .set('Authorization', token)
        .end((err, response) => {
          response.should.have.status(403);
          response.body.should.be.a('object');
          response.body.should.have.property('error').eql('Access denied, provide token');
          done();
        });
    });
  });

  describe('Get All accounts by status', () => {
    it('it should GET all the dormant accounts', (done) => {
      const result = [{
        id: 2,
        accountNumber: 1556261730217,
        createdOn: new Date().toLocaleString(),
        email: 'johnsmith@emial.com',
        type: 'savings',
        status: 'dormant',
        balance: 500.78
      }
      ];
      chai.request(app)
        .get('/api/v2/accounts/status/dormant')
        .set('Authorization', token)
        .end((error, response) => {
          response.body.should.be.a('object');
          response.should.have.status(403);
          response.body.should.have.property('error').eql('Access denied, provide token');
          result.should.be.a('array');
          result[0].should.have.property('accountNumber');
          result[0].should.have.property('createdOn');
          result[0].should.have.property('email');
          result[0].should.have.property('type');
          result[0].should.have.property('id');
          result[0].should.have.property('status');
          result[0].should.have.property('balance');
          done();
        });
    });

    it('it should GET all the active accounts', (done) => {
      const result = [{
        id: 2,
        accountNumber: 1556261730217,
        createdOn: new Date().toLocaleString(),
        email: 'johnsmith@emial.com',
        type: 'savings',
        status: 'active',
        balance: 500.78
      }
      ];
      chai.request(app)
        .get('/api/v2/accounts/status/active')
        .set('Authorization', token)
        .end((error, response) => {
          response.body.should.be.a('object');
          response.should.have.status(403);
          response.body.should.have.property('error').eql('Access denied, provide token');
          result.should.be.a('array');
          result[0].should.have.property('accountNumber');
          result[0].should.have.property('createdOn');
          result[0].should.have.property('email');
          result[0].should.have.property('type');
          result[0].should.have.property('id');
          result[0].should.have.property('status');
          result[0].should.have.property('balance');
          done();
        });
    });
  });

  describe('GET all accounts owned by a specific account', () => {
    it('it should GET all accounts owned by a specific account with a given email', (done) => {
      const result = [{
        id: 2,
        accountNumber: 1556261730217,
        createdOn: new Date().toLocaleString(),
        email: 'johnsmith@emial.com',
        type: 'savings',
        status: 'dormant',
        balance: 500.78
      },
      {
        id: 3,
        accountNumber: 1556261730217,
        createdOn: new Date().toLocaleString(),
        email: 'johnsmith@emial.com',
        type: 'savings',
        status: 'dormant',
        balance: 500.78
      }
      ];
      chai.request(app)
        .get('/api/v2/accounts/user/:email')
        .set('Authorization', token)
        .send({
          accountNumber: 1
        })
        .end((error, response) => {
          response.body.should.be.a('object');
          response.should.have.status(403);
          response.body.should.have.property('error').eql('Access denied, provide token');
          result.should.be.a('array');
          result[0].should.have.property('accountNumber');
          result[0].should.have.property('createdOn');
          result[0].should.have.property('email');
          result[0].should.have.property('type');
          result[0].should.have.property('id');
          result[0].should.have.property('status');
          result[0].should.have.property('balance');
          done();
        });
    });
  });
});
