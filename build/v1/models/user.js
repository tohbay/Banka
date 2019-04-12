"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _users = _interopRequireDefault(require("../../db/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserService =
/*#__PURE__*/
function () {
  function UserService() {
    _classCallCheck(this, UserService);
  }

  _createClass(UserService, null, [{
    key: "getAll",
    value: function getAll() {
      return _users["default"];
    }
  }, {
    key: "create",
    value: function create(user) {
      var id = _users["default"][_users["default"].length - 1].id + 1;
      var type = 'client';
      var isAdmin = false;
      var email = user.email,
          firstName = user.firstName,
          lastName = user.lastName,
          password = user.password;

      var newUser = _objectSpread({
        id: id
      }, user, {
        type: type,
        isAdmin: isAdmin
      });

      _users["default"].push(newUser);

      return newUser;
    }
  }, {
    key: "getOne",
    value: function getOne(id) {
      var user = _users["default"].find(function (user) {
        return user.id === id;
      });

      return user || {};
    }
  }, {
    key: "deleteOne",
    value: function deleteOne(id) {
      var user = _users["default"].find(function (user) {
        return user.id === id;
      });

      var index = _users["default"].indexOf(user);

      _users["default"].splice(index, 1);

      return user || {};
    }
  }]);

  return UserService;
}();

var _default = UserService;
exports["default"] = _default;