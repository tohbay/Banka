"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _debug = _interopRequireDefault(require("debug"));

var _account = _interopRequireDefault(require("../models/account"));

var _user = _interopRequireDefault(require("../models/user"));

var _accounts = _interopRequireDefault(require("../../db/accounts"));

var _users = _interopRequireDefault(require("../../db/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var accountController =
/*#__PURE__*/
function () {
  function accountController() {
    _classCallCheck(this, accountController);
  }

  _createClass(accountController, null, [{
    key: "create",
    value: function create(request, response) {
      if (!request.body.type) {
        return response.status(400).json({
          status: 400,
          error: 'Account type is required'
        });
      }

      var account = _accounts["default"][_accounts["default"].length - 1].id;
      console.log(_accounts["default"][_accounts["default"].length - 1].id, _accounts["default"].length, _users["default"].length);

      if (account === _users["default"].length) {
        return response.status(400).json({
          status: 400,
          error: 'Account already exist'
        });
      }

      var type = request.body;

      var newAccount = _account["default"].create(type);

      console.log(newAccount);
      return response.status(201).send({
        status: 201,
        data: newAccount
      });
    }
  }, {
    key: "getallAccounts",
    value: function getallAccounts(request, response) {
      return response.status(200).send(_accounts["default"]);
    }
  }, {
    key: "getOne",
    value: function getOne(request, response) {
      var id = request.params.id;

      var retrieved = _account["default"].getOne(Number(id));

      if (!retrieved) return response.status(404).send({
        message: ' Account number not found!'
      });
      return response.status(200).send({
        message: 'Account number sucessfully activated',
        data: retrieved
      });
    }
  }, {
    key: "patchOne",
    value: function patchOne(request, response) {
      var accountNumber = request.params.accountNumber;

      var retrieved = _account["default"].getOne(Number(accountNumber));

      if (!retrieved) return response.status(404).send({
        error: 'Account number not found!'
      });
      if (!request.body.status) return response.status(400).send({
        error: 'Status is required'
      });
      retrieved.status = request.body.status;

      if (retrieved.status === 'active') {
        return response.status(200).send({
          message: 'Account number sucessfully activated',
          data: retrieved
        });
      }

      return response.status(200).send({
        message: 'Account number sucessfully deactivated',
        data: retrieved
      });
    }
  }]);

  return accountController;
}();

var _default = accountController;
exports["default"] = _default;