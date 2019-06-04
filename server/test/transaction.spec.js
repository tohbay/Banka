import chai from 'chai';
import 'chai/register-should';
import chaiHttp from 'chai-http';

import app from '../app';


chai.use(chaiHttp);
const should = chai.should();

const request = chai.request(app);


describe('Testing transactions endpoints', () => {
  beforeEach((done) => {
    done();
  });
  afterEach((done) => {
    done();
  });

  const draftAccount = {
    id: 2,
    accountNumber: 1556261730217,
    createdOn: new Date().toLocaleString(),
    email: 'johnsmith@emial.com',
    type: 'savings',
    status: 'draft',
    balance: 403.78
  };

  const dormantAccount = {
    id: 2,
    accountNumber: 1556261730217,
    createdOn: new Date().toLocaleString(),
    email: 'johnsmith@emial.com',
    type: 'savings',
    status: 'dormant',
    balance: 403.78
  };

  const activeAccount = {
    id: 2,
    accountNumber: 1556261730217,
    createdOn: new Date().toLocaleString(),
    email: 'johnsmith@emial.com',
    type: 'savings',
    status: 'active',
    balance: 403.78
  };

  const noAccountNumber = {
    id: 2,
    createdOn: new Date().toLocaleString(),
    email: 'johnsmith@emial.com',
    type: 'savings',
    status: 'dormant',
    cashier: 4,
    oldBalance: 4030.43,
    newBalance: 200.00,
    balance: 200.00
  };

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksImVtYWlsIjoiZ2luZ2VyQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IkdpbmdlciIsImxhc3ROYW1lIjoiR2luZ2VyIiwicGFzc3dvcmQiOiIkMmEkMTAkSlVSc3JIdjdMNjhpcWszS0xCbjJnT3lPUFFCZlBTdzFnUEM3T0hrb0JOSzY4YlQxbDA4T1ciLCJ0eXBlIjoiY2xpZW50IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU1OTM5NzYzNCwiZXhwIjoxNTU5NDg0MDM0fQ._4Xq5qvj9OhByO6S1Z1ATDdCb0B4niOJgo4dUGe_qKU';

  describe('It should test the GET transactions endpoint', () => {
    it('It should fetch all transaction records', (done) => {
      const transactionUrl = '/api/v2/transactions/';
      const transactions = [{
        id: 5,
        createdOn: new Date().toLocaleString(),
        type: 'credit',
        accountNumber: 1556261730217,
        cashier: 4,
        amount: 403.00,
        oldBalance: 4030.43,
        newBalance: 200.00
      }
      ];
      chai.request(app)
        .get(transactionUrl)
        .set('Authorization', token)
        .end((error, response) => {
          response.should.have.status(403);
          response.body.should.be.a('object');
          // response.body.should.have.property('error').eql('Access denied, provide token');
          transactions.should.be.a('array');
          transactions[0].should.have.property('accountNumber');
          transactions[0].should.have.property('createdOn');
          transactions[0].should.have.property('type');
          transactions[0].should.have.property('id');
          transactions[0].should.have.property('cashier');
          transactions[0].should.have.property('oldBalance');
          transactions[0].should.have.property('newBalance');
          done();
        });
    });

    it('It should fetch a specific transaction record', (done) => {
      const specificTransactionUrl = '/api/v2/transactions/:id/';
      const transaction = {
        id: 5,
        createdOn: new Date().toLocaleString(),
        type: 'credit',
        accountNumber: 1556261730217,
        cashier: 4,
        amount: 403.00,
        oldBalance: 4030.43,
        newBalance: 200.00
      };
      chai.request(app)
        .get(specificTransactionUrl)
        .set('Authorization', token)
        .send(transaction)
        .end((error, response) => {
          response.should.have.status(403);
          response.body.should.be.a('object');
          // response.body.should.have.property('error').eql('Access denied, provide token');
          transaction.should.be.a('object');
          transaction.should.have.property('createdOn');
          transaction.should.have.property('type');
          transaction.should.have.property('id');
          transaction.should.have.property('accountNumber');
          transaction.should.have.property('cashier');
          transaction.should.have.property('oldBalance');
          transaction.should.have.property('newBalance');
          done();
        });
    });

    it('it should throw an error when transaction id is not found', (done) => {
      const transaction = {
        createdOn: new Date().toLocaleString(),
        type: 'credit',
        accountNumber: 1556261730217,
        cashier: 4,
        amount: 403.00,
        oldBalance: 4030.43,
        newBalance: 200.00
      };

      chai.request(app)
        .get('/api/v2/transactions/:id')
        .set('Authorization', token)
        .send(transaction)
        .end((err, response) => {
          response.should.have.status(403);
          response.body.should.be.a('object');
          // response.body.should.have.property('error').eql('Access denied, provide token');
          transaction.should.be.a('object');
          transaction.should.have.property('createdOn');
          transaction.should.have.property('type');
          transaction.should.not.have.property('id');
          transaction.should.have.property('accountNumber');
          transaction.should.have.property('cashier');
          transaction.should.have.property('oldBalance');
          transaction.should.have.property('newBalance');
          done();
        });
    });

    it('It should not post a credit transaction when account number is not found', (done) => {
      const creditUrl = '/api/v2/transactions/accountNumber/credit/';
      chai.request(app)
        .post(creditUrl)
        .set('Authorization', token)
        .send(noAccountNumber)
        .end((error, response) => {
          response.should.have.status(403);
          response.body.should.be.a('object');
          // response.body.should.have.property('error').eql('Access denied, provide token');
          noAccountNumber.should.be.a('object');
          noAccountNumber.should.have.property('createdOn');
          noAccountNumber.should.have.property('type');
          noAccountNumber.should.have.property('id');
          noAccountNumber.should.not.have.property('accountNumber');
          noAccountNumber.should.have.property('cashier');
          noAccountNumber.should.have.property('oldBalance');
          noAccountNumber.should.have.property('newBalance');
          done();
        });
    });

    it('It should not post a credit transaction when status is dormant', (done) => {
      const creditUrl = '/api/v2/transactions/accountNumber/credit/';
      chai.request(app)
        .post(creditUrl)
        .set('Authorization', token)
        .send(dormantAccount)
        .end((error, response) => {
          response.should.have.status(403);
          response.body.should.be.a('object');
          // response.body.should.have.property('error').eql('Access denied, provide token');
          dormantAccount.should.be.a('object');
          dormantAccount.should.have.property('accountNumber');
          dormantAccount.should.have.property('createdOn');
          dormantAccount.should.have.property('email');
          dormantAccount.should.have.property('type');
          dormantAccount.should.have.property('id');
          dormantAccount.should.have.property('status').eql('dormant');
          dormantAccount.should.have.property('balance');
          done();
        });
    });

    it('It should not post a credit transaction when status is draft', (done) => {
      const creditUrl = '/api/v2/transactions/accountNumber/credit/';
      chai.request(app)
        .post(creditUrl)
        .set('Authorization', token)
        .send(draftAccount)
        .end((error, response) => {
          response.should.have.status(403);
          response.body.should.be.a('object');
          // response.body.should.have.property('error').eql('Access denied, provide token');
          draftAccount.should.be.a('object');
          draftAccount.should.have.property('accountNumber');
          draftAccount.should.have.property('createdOn');
          draftAccount.should.have.property('email');
          draftAccount.should.have.property('type');
          draftAccount.should.have.property('id');
          draftAccount.should.have.property('status').eql('draft');
          draftAccount.should.have.property('balance');
          done();
        });
    });

    it('It should not post a debit transaction when account number is not found', (done) => {
      const debitUrl = '/api/v2/transactions/accountNumber/debit/';
      chai.request(app)
        .post(debitUrl)
        .set('Authorization', token)
        .send(noAccountNumber)
        .end((error, response) => {
          response.should.have.status(403);
          response.body.should.be.a('object');
          // response.body.should.have.property('error').eql('Access denied, provide token');
          noAccountNumber.should.be.a('object');
          noAccountNumber.should.not.have.property('accountNumber');
          noAccountNumber.should.have.property('createdOn');
          noAccountNumber.should.have.property('email');
          noAccountNumber.should.have.property('type');
          noAccountNumber.should.have.property('id');
          noAccountNumber.should.have.property('status').eql('dormant');
          noAccountNumber.should.have.property('balance');
          done();
        });
    });

    it('It should not post a debit transaction when status is dormant', (done) => {
      const debitUrl = '/api/v2/transactions/accountNumber/debit/';
      chai.request(app)
        .post(debitUrl)
        .set('Authorization', token)
        .send(dormantAccount)
        .end((error, response) => {
          response.should.have.status(403);
          response.body.should.be.a('object');
          // response.body.should.have.property('error').eql('Access denied, provide token');
          dormantAccount.should.be.a('object');
          dormantAccount.should.have.property('accountNumber');
          dormantAccount.should.have.property('createdOn');
          dormantAccount.should.have.property('email');
          dormantAccount.should.have.property('type');
          dormantAccount.should.have.property('id');
          dormantAccount.should.have.property('status').eql('dormant');
          dormantAccount.should.have.property('balance');
          done();
        });
    });

    it('It should not post a debit transaction when status is draft', (done) => {
      const debitUrl = '/api/v2/transactions/accountNumber/debit/';
      chai.request(app)
        .post(debitUrl)
        .set('Authorization', token)
        .send(draftAccount)
        .end((error, response) => {
          response.should.have.status(403);
          response.body.should.be.a('object');
          // response.body.should.have.property('error').eql('Access denied, provide token');
          draftAccount.should.be.a('object');
          draftAccount.should.have.property('accountNumber');
          draftAccount.should.have.property('createdOn');
          draftAccount.should.have.property('email');
          draftAccount.should.have.property('type');
          draftAccount.should.have.property('id');
          draftAccount.should.have.property('status').eql('draft');
          draftAccount.should.have.property('balance');
          done();
        });
    });

    it('It should not post a debit transaction when balance is less than amount', (done) => {
      const debitUrl = '/api/v2/transactions/accountNumber/debit/';
      const account = {
        id: 2,
        accountNumber: 1556261730217,
        createdOn: new Date().toLocaleString(),
        email: 'johnsmith@emial.com',
        type: 'savings',
        status: 'active',
        amount: 1000.00,
        balance: 403.78
      };
      chai.request(app)
        .post(debitUrl)
        .set('Authorization', token)
        .send(account)
        .end((error, response) => {
          response.should.have.status(403);
          response.body.should.be.a('object');
          // response.body.should.have.property('error').eql('Access denied, provide token');
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

    it('it should throw an insufficient balance error', (done) => {
      const account = {
        id: 2,
        accountNumber: 1556261730217,
        createdOn: new Date().toLocaleString(),
        email: 'johnsmith@emial.com',
        type: 'savings',
        status: 'active',
        amount: 1000.00,
        balance: 403.78
      };
      chai.request(app)
        .post('/api/v2/transactions/accountNumber/debit/')
        .set('Authorization', token)
        .send(account)
        .end((err, response) => {
          response.should.have.status(403);
          response.body.should.be.a('object');
          // response.body.should.have.property('error').eql('Access denied, provide token');
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
      chai.request(app)
        .post('/api/v2/transactions/accountNumber/debit/')
        .set('Authorization', token)
        .send(noAccountNumber)
        .end((err, response) => {
          response.should.have.status(403);
          response.body.should.be.a('object');
          // response.body.should.have.property('error').eql('Access denied, provide token');
          noAccountNumber.should.be.a('object');
          noAccountNumber.should.not.have.property('accountNumber');
          noAccountNumber.should.have.property('createdOn');
          noAccountNumber.should.have.property('email');
          noAccountNumber.should.have.property('type');
          noAccountNumber.should.have.property('id');
          noAccountNumber.should.have.property('status');
          noAccountNumber.should.have.property('balance');
          done();
        });
    });

    it('it should throw an error when "amount" in request body is not provided ', (done) => {
      const account = {
        id: 2,
        accountNumber: 1556261730217,
        createdOn: new Date().toLocaleString(),
        email: 'johnsmith@emial.com',
        type: 'savings',
        status: 'active',
        balance: 403.78
      };
      chai.request(app)
        .post('/api/v2/transactions/accountNumber/debit/')
        .set('Authorization', token)
        .send(account)
        .end((err, response) => {
          response.should.have.status(403);
          response.body.should.be.a('object');
          // response.body.should.have.property('error').eql('Access denied, provide token');
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

    it('it should throw an error when amount is not a number', (done) => {
      const transaction = {
        id: 5,
        accountNumber: 1556261730217,
        createdOn: new Date().toLocaleString(),
        type: 'credit',
        cashier: 4,
        amount: 'eft403.00abd',
        oldBalance: 4030.43,
        newBalance: 200.00
      };
      chai.request(app)
        .post('/api/v2/transactions/accountNumber/debit/')
        .set('Authorization', token)
        .send(transaction)
        .end((err, response) => {
          response.should.have.status(403);
          response.body.should.be.a('object');
          // response.body.should.have.property('error').eql('Access denied, provide token');
          transaction.should.be.a('object');
          transaction.should.have.property('createdOn');
          transaction.should.have.property('type');
          transaction.should.have.property('id');
          transaction.should.have.property('accountNumber');
          transaction.should.have.property('cashier');
          transaction.should.have.property('oldBalance');
          transaction.should.have.property('newBalance');
          done();
        });
    });

    it('it throws an error if account number is invalid', (done) => {
      const account = {
        id: 2,
        accountNumber: 'edft155626dfsd1730217',
        createdOn: new Date().toLocaleString(),
        email: 'johnsmith@emial.com',
        type: 'savings',
        status: 'active',
        balance: 403.78
      };
      chai.request(app)
        .post('/api/v2/transactions/accountNumber/debit/')
        .set('Authorization', token)
        .send(account)
        .end((err, response) => {
          response.should.have.status(403);
          response.body.should.be.a('object');
          // response.body.should.have.property('error').eql('Access denied, provide token');
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
      const noAccountNumber = {
        id: 2,
        createdOn: new Date().toLocaleString(),
        email: 'johnsmith@emial.com',
        type: 'savings',
        status: 'dormant',
        cashier: 4,
        oldBalance: 4030.43,
        newBalance: 200.00,
        balance: 200.00
      };
      chai.request(app)
        .get('/api/v2/transactions/:accountNumber/transactions')
        .set('Authorization', token)
        .end((err, response) => {
          response.should.have.status(403);
          response.body.should.be.a('object');
          // response.body.should.have.property('error').eql('Access denied, provide token');
          noAccountNumber.should.be.a('object');
          noAccountNumber.should.not.have.property('accountNumber');
          noAccountNumber.should.have.property('createdOn');
          noAccountNumber.should.have.property('email');
          noAccountNumber.should.have.property('type');
          noAccountNumber.should.have.property('id');
          noAccountNumber.should.have.property('status').eql('dormant');
          noAccountNumber.should.have.property('balance');
          done();
        });
    });

    it('it should get an account transactions', (done) => {
      const account = [{
        id: 2,
        accountNumber: 'edft155626dfsd1730217',
        createdOn: new Date().toLocaleString(),
        email: 'johnsmith@emial.com',
        type: 'savings',
        status: 'active',
        balance: 403.78
      },
      {
        id: 3,
        accountNumber: 'edft155626dfsd1730217',
        createdOn: new Date().toLocaleString(),
        email: 'johnsmith@emial.com',
        type: 'savings',
        status: 'active',
        balance: 403.78
      }];
      chai.request(app)
        .get('/api/v2/transactions/:accountNumber/transactions')
        .set('Authorization', token)
        .end((err, response) => {
          response.should.have.status(403);
          response.body.should.be.a('object');
          // response.body.should.have.property('error').eql('Access denied, provide token');
          account.should.be.a('array');
          account[0].should.have.property('accountNumber');
          account[0].should.have.property('createdOn');
          account[0].should.have.property('email');
          account[0].should.have.property('type');
          account[0].should.have.property('id');
          account[0].should.have.property('status');
          account[0].should.have.property('balance');
          done();
        });
    });
  });
});
