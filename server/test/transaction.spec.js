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
          newBalance: 500.00
        })
        .end((error, response) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          console.log(res.body);
          done();
        });
    });

    it('It should fetch a specific transaction record', (done) => {
      const specificTransactionUrl = '/api/v1/transactions/:id';
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
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          console.log(res.body);
          done();
        });
    });
  });
});
