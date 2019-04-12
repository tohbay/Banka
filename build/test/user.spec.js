"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

_chai["default"].use(_chaiHttp["default"]);

var should = _chai["default"].should();

describe('Mocha test for User Controller', function () {
  describe('Mocha test for user signup route', function () {
    var signupUrl = '/api/v1/auth/signup';
    it('should create a new user when all the parameters are given', function (done) {
      _chai["default"].request(_app["default"]).post(signupUrl).send({
        email: 'John@email.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'freedom'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.status).to.equal(201);
        (0, _chai.expect)(response.body.status).to.equal(201);
        (0, _chai.expect)(response.body.data).to.have.property('email');
        (0, _chai.expect)(response.body.data).to.have.property('firstName');
        (0, _chai.expect)(response.body.data).to.have.property('lastName');
        (0, _chai.expect)(response.body.data).to.have.property('password');
        console.log(response.body);
        done();
      });
    });
    it('should not register a user when the email is missing', function (done) {
      _chai["default"].request(_app["default"]).post(signupUrl).send({
        id: 1,
        firstName: 'Frank',
        lastName: 'Obi',
        password: '12345',
        type: 'client',
        isAdmin: false
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal(400);
        (0, _chai.expect)(response.body.error).to.be.a('string');
        (0, _chai.expect)(response.body.error).to.equal('Email is required');
        done();
      });
    });
    it('should not register a user when the first name is missing', function (done) {
      _chai["default"].request(_app["default"]).post(signupUrl).send({
        id: 1,
        email: 'frank@email.com',
        lastName: 'Obi',
        password: '12345',
        type: 'client',
        isAdmin: false
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal(400);
        (0, _chai.expect)(response.body.error).to.be.a('string');
        (0, _chai.expect)(response.body.error).to.equal('First name is required');
        done();
      });
    });
    it('should not register a user when the last name is missing', function (done) {
      _chai["default"].request(_app["default"]).post(signupUrl).send({
        id: 1,
        email: 'frank@email.com',
        firstName: 'Frank',
        password: '12345',
        type: 'client',
        isAdmin: false
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal(400);
        (0, _chai.expect)(response.body.error).to.be.a('string');
        (0, _chai.expect)(response.body.error).to.equal('Last name is required');
        done();
      });
    });
    it('should not register a user when the password is missing', function (done) {
      _chai["default"].request(_app["default"]).post(signupUrl).send({
        id: 1,
        email: 'frank@email.com',
        firstName: 'Frank',
        lastName: 'Obi',
        type: 'client',
        isAdmin: false
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal(400);
        (0, _chai.expect)(response.body.error).to.be.a('string');
        (0, _chai.expect)(response.body.error).to.equal('Password is required');
        done();
      });
    });
    it('should not register a user when the email already exist', function (done) {
      _chai["default"].request(_app["default"]).post(signupUrl).send({
        id: 1,
        email: 'frank@email.com',
        firstName: 'Frank',
        lastName: 'Obi',
        password: '12345',
        type: 'client',
        isAdmin: false
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal(400);
        (0, _chai.expect)(response.body.error).to.be.a('string');
        (0, _chai.expect)(response.body.error).to.equal('Email already exist');
        done();
      });
    });
  });
  describe('Mocha test for user signin route', function () {
    var signinUrl = '/api/v1/auth/signin';
    it('should signin an existing user when all the parameters are given', function (done) {
      _chai["default"].request(_app["default"]).post(signinUrl).send({
        email: 'frank@email.com',
        password: '12345'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.status).to.equal(201);
        (0, _chai.expect)(response.body.status).to.equal(201);
        (0, _chai.expect)(response.body.data).to.be.an('object');
        (0, _chai.expect)(response.body.data).to.have.property('email');
        (0, _chai.expect)(response.body.data.email).to.equal('frank@email.com');
        console.log(response.body);
        done();
      });
    });
    it('should not register a user when the email is missing', function (done) {
      _chai["default"].request(_app["default"]).post(signinUrl).send({
        password: '12345'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal(400);
        (0, _chai.expect)(response.body.error).to.be.a('string');
        (0, _chai.expect)(response.body.error).to.equal('Email is required');
        done();
      });
    });
    it('should not register a user when the password is missing', function (done) {
      _chai["default"].request(_app["default"]).post(signinUrl).send({
        email: 'frank@email.com'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal(400);
        (0, _chai.expect)(response.body.error).to.be.a('string');
        (0, _chai.expect)(response.body.error).to.equal('Password is required');
        done();
      });
    });
  });
});