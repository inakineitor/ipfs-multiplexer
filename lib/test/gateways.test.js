"use strict";

var _chai = require("chai");

var _gateways = _interopRequireDefault(require("../gateways"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Describe gateways', () => {
  it('should have all properties defined', () => {
    for (const {
      protocol,
      host,
      apiPath,
      port
    } of _gateways.default) {
      (0, _chai.expect)(protocol).to.not.be.undefined;
      (0, _chai.expect)(host).to.not.be.undefined;
      (0, _chai.expect)(apiPath).to.not.be.undefined;
      (0, _chai.expect)(port).to.not.be.undefined;
    }
  });
});
//# sourceMappingURL=gateways.test.js.map