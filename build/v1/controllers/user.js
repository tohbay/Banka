"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../models/user"));

var _users = _interopRequireDefault(require("../../db/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var userController =
/*#__PURE__*/
function () {
  function userController() {
    _classCallCheck(this, userController);
  }

  _createClass(userController, null, [{
    key: "signup",
    value: function signup(request, response) {
      if (!request.body.firstName) {
        return response.status(400).json({
          status: 400,
          error: 'First name is required'
        });
      }

      if (!request.body.lastName) {
        return response.status(400).json({
          status: 400,
          error: 'Last name is required'
        });
      }

      if (!request.body.email) {
        return response.status(400).json({
          status: 400,
          error: 'Email is required'
        });
      }

      if (!request.body.password) {
        return response.status(400).json({
          status: 400,
          error: 'Password is required'
        });
      }

      var email = request.body.email;

      var emailExist = _users["default"].find(function (user) {
        return user.email === email;
      });

      if (emailExist) {
        return response.status(400).json({
          status: 400,
          error: 'Email already exist'
        });
      }

      var userdata = request.body;

      var signupData = _user["default"].create(userdata);

      return response.status(201).send({
        status: 201,
        data: signupData
      });
    }
  }, {
    key: "signin",
    value: function signin(request, response) {
      if (!request.body.email) {
        return response.status(400).json({
          status: 400,
          error: 'Email is required'
        });
      }

      if (!request.body.password) {
        return response.status(400).json({
          status: 400,
          error: 'Password is required'
        });
      }

      var _request$body = request.body,
          email = _request$body.email,
          password = _request$body.password;

      var emailExist = _users["default"].find(function (user) {
        return user.email === email;
      });

      var passwordExist = _users["default"].find(function (user) {
        return user.password === password;
      });

      if (!emailExist || !passwordExist) {
        return response.status(400).json({
          status: 400,
          error: 'Login failed, Email or Password is incorrect'
        });
      }

      var loginData = _users["default"].find(function (user) {
        return user.email === email;
      });

      return response.status(201).send({
        status: 201,
        message: 'Login successful',
        data: loginData
      });
    }
  }]);

  return userController;
}();

var _default = userController;
exports["default"] = _default;