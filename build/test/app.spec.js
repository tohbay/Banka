"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

_chai["default"].use(_chaiHttp["default"]);

var should = _chai["default"].should();

describe('Testing home endpoint', function () {
  it('It should return status of 200 on sucessful page load', function (done) {
    var appUrl = '/api/v1/';

    _chai["default"].request(_app["default"]).get(appUrl).end(function (err, res) {
      (0, _chai.expect)(res.status).to.equal(200);
      (0, _chai.expect)(res.body).to.be.a('object');
      console.log(res.body);
      done();
    });
  });
});