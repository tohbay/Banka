import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

const should = chai.should();


describe('Testing transactions endpoints', () => {
  describe('It should test the GET transactions endpoint', () => {
    it('It should fetch all transaction records', (done) => {
      const transactionUrl = '/api/v1/transactions/';
      chai.request(app)
        .get(transactionUrl)
        .send({
          id: 1,
          createdOn: new Date().toLocaleString(),
          type: 'credit',
          accountNumber: 1,
          cashier: 1,
          amount: 500.00,
          oldBalance: 0.00,
          newBalance: 500.05
        })
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          console.log(response.body);
          done();
        });
    });

    it('It should fetch a specific transaction record', (done) => {
      const specificTransactionUrl = '/api/v1/transactions/:id/';
      chai.request(app)
        .get(specificTransactionUrl)
        .send({
          id: 1,
          createdOn: new Date().toLocaleString(),
          type: 'credit',
          accountNumber: 1,
          cashier: 1,
          amount: 500.00,
          oldBalance: 0.00,
          newBalance: 500.00
        })
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          done();
        });
    });

    it('It should post a credit transaction to a specified account number', (done) => {
      const creditUrl = '/api/v1/transactions/:accountNumber/credit/';
      chai.request(app)
        .post(creditUrl)
        .send({
          transactionId: 1,
          accountNumber: 1,
          createdOn: new Date().toLocaleString(),
          amount: 500.00,
          cashier: 1,
          transactionType: 'credit',
          accountBalance: 500.00
        })
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          done();
        });
    });

    it('It should post a debit transaction to a specified account number', (done) => {
      const debitUrl = '/api/v1/transactions/:accountNumber/debit/';
      chai.request(app)
        .post(debitUrl)
        .send({
          transactionId: 1,
          accountNumber: 1,
          createdOn: new Date().toLocaleString(),
          amount: 500.00,
          cashier: 1,
          transactionType: 'debit',
          accountBalance: 500.00
        })
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          done();
        });
    });
  });
});
