"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _user = _interopRequireDefault(require("./v1/routes/user"));

var _account = _interopRequireDefault(require("./v1/routes/account"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _morgan["default"])('tiny'));
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
app.get('/api/v1', function (request, response) {
  response.status(200).send({
    message: 'Welcome to Banka API, your services at its best'
  });
});
app.use('/api/v1/auth/', _user["default"]);
app.use('/api/v1/accounts/', _account["default"]);
var _default = app;
exports["default"] = _default;