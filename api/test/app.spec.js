/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

const should = chai.should();


describe('Testing home endpoint', () => {
  it('It should return status of 200 on sucessful page load', (done) => {
    const appUrl = '/api/v1/';
    chai.request(app)
      .get(appUrl)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        console.log(res.body);
        done();
      });
  });
});
