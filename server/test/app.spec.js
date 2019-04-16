import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

const should = chai.should();


describe('Testing home endpoint', () => {
  it('It should return status of 200 on sucessful page load', (done) => {
    const appUrl = '/';
    chai.request(app)
      .get(appUrl)
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.a('object');
        done();
      });
  });
});
