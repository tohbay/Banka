"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _accounts = _interopRequireDefault(require("../../db/accounts"));

var _users = _interopRequireDefault(require("../../db/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AccountService =
/*#__PURE__*/
function () {
  function AccountService() {
    _classCallCheck(this, AccountService);
  }

  _createClass(AccountService, null, [{
    key: "getAll",
    value: function getAll() {
      return _accounts["default"];
    }
  }, {
    key: "create",
    value: function create(data) {
      var newAccount = {
        id: _accounts["default"][_accounts["default"].length - 1].id + 1,
        accountNumber: _users["default"][_users["default"].length - 1].id,
        firstName: _users["default"][_users["default"].length - 1].firstName,
        lastName: _users["default"][_users["default"].length - 1].lastName,
        email: _users["default"][_users["default"].length - 1].email,
        createdOn: new Date().toLocaleString(),
        owner: _users["default"][_users["default"].length - 1].id,
        type: data.type,
        status: 'draft',
        openingBalance: 0.00
      };

      _accounts["default"].push(newAccount);

      return newAccount;
    }
  }, {
    key: "getOne",
    value: function getOne(id) {
      var account = _accounts["default"].find(function (account) {
        return account.id === id;
      });

      return account;
    }
  }, {
    key: "deleteOne",
    value: function deleteOne(id) {
      var account = _accounts["default"].find(function (account) {
        return account.id === id;
      });

      var index = _accounts["default"].indexOf(account);

      _accounts["default"].splice(index, 1);

      return account;
    }
  }]);

  return AccountService;
}();

var _default = AccountService;
exports["default"] = _default;