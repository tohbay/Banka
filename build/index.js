"use strict";

var _chalk = _interopRequireDefault(require("chalk"));

var _debug = _interopRequireDefault(require("debug"));

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var debug = (0, _debug["default"])('app');
var port = process.env.PORT || 3001;

_app["default"].listen(port, function () {
  debug("API server started on port ".concat(_chalk["default"].yellowBright(port)));
});