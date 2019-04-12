"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

_chai["default"].use(_chaiHttp["default"]);

var should = _chai["default"].should();

describe('Mocha test for Account Controller', function () {
  describe('Mocha test for creating a bank account', function () {
    var createAccountUrl = '/api/v1/accounts';
    it('should create a bank account when all the parameters are given', function (done) {
      _chai["default"].request(_app["default"]).post(createAccountUrl).send({
        id: 2,
        accountNumber: 2,
        email: 'Emeka@email.com',
        firstName: 'Emeka',
        lastName: 'John',
        createdOn: new Date().toLocaleString(),
        owner: 2,
        type: 'savings',
        status: 'active',
        openingBalance: 550.35
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.status).to.equal(201);
        (0, _chai.expect)(response.body.status).to.equal(201);
        (0, _chai.expect)(response.body.data).to.be.an('object');
        (0, _chai.expect)(response.body.data).to.have.property('id');
        (0, _chai.expect)(response.body.data).to.have.property('accountNumber');
        (0, _chai.expect)(response.body.data).to.have.property('email');
        (0, _chai.expect)(response.body.data).to.have.property('firstName');
        (0, _chai.expect)(response.body.data).to.have.property('lastName');
        (0, _chai.expect)(response.body.data).to.have.property('createdOn');
        (0, _chai.expect)(response.body.data).to.have.property('type');
        (0, _chai.expect)(response.body.data).to.have.property('status');
        (0, _chai.expect)(response.body.data).to.have.property('openingBalance');
        console.log(response.body);
        console.log(error);
        done();
      });
    });
    it('should not create a bank account when the type is missing', function (done) {
      _chai["default"].request(_app["default"]).post(createAccountUrl).send({}).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal(400);
        (0, _chai.expect)(response.body.error).to.be.a('string');
        (0, _chai.expect)(response.body.error).to.equal('Account type is required');
        done();
      });
    });
    it('should not create an account when accountNumber already exist', function (done) {
      _chai["default"].request(_app["default"]).post(createAccountUrl).send({
        id: 1,
        accountNumber: 1,
        createdOn: Date.now(),
        owner: 1,
        type: 'savings',
        status: 'draft',
        openingBalance: 0.00
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal(400);
        (0, _chai.expect)(response.body.error).to.be.a('string');
        (0, _chai.expect)(response.body.error).to.equal('Account already exist');
        done();
      });
    });
  });
  describe('Mocha test for PATCH request on a bank account', function () {
    var patchUrl = '/api/v1/accounts/:accountNumber';
    it('should patch a selected account number when all the parameters are given', function (done) {
      _chai["default"].request(_app["default"]).patch(patchUrl).send({
        status: 'active' || 'dormant'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.status).to.equal(201);
        (0, _chai.expect)(response.data).to.be.an('object');
        (0, _chai.expect)(response.body.data).to.have.property('id');
        (0, _chai.expect)(response.body.data).to.have.property('accountNumber');
        (0, _chai.expect)(response.body.data).to.have.property('firstName');
        (0, _chai.expect)(response.body.data).to.have.property('lastName');
        (0, _chai.expect)(response.body.data).to.have.property('createdOn');
        (0, _chai.expect)(response.body.data).to.have.property('openingBalance');
        (0, _chai.expect)(response.body.data).to.have.property('email');
        (0, _chai.expect)(response.body.data).to.have.property('type');
        (0, _chai.expect)(response.body.data).to.have.property('status');
        (0, _chai.expect)(response.body.data.email).to.equal('frank@email.com');
        console.log(response.body);
        done();
      });
    });
    it('should not patch the account number when accountNumber is not found', function (done) {
      _chai["default"].request(_app["default"]).patch(patchUrl).send().end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.status).to.equal(404);
        (0, _chai.expect)(response.body.error).to.be.a('string');
        (0, _chai.expect)(response.body.error).to.equal('Account number not found!');
        done();
      });
    });
    it('should not patch the account number when the status is missing', function (done) {
      _chai["default"].request(_app["default"]).patch(patchUrl).send({}).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.status).to.equal(404);
        (0, _chai.expect)(response.body.accountNumber).to.not.equal('status');
        (0, _chai.expect)(response.body.error).to.be.a('string');
        (0, _chai.expect)(response.body.error).to.equal('Account number not found!');
        done();
      });
    });
  });
});