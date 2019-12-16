"use strict";

var _chai = require("chai");

var _ipfsClientMethods = _interopRequireDefault(require("../ipfs-client-methods"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Describe ipfs client methods', () => {
  it('should have valid values', () => {
    for (const method in _ipfsClientMethods.default) {
      const optionsIndex = _ipfsClientMethods.default[method];
      (0, _chai.expect)(optionsIndex).to.satisfy(index => index === null || index >= 0);
    }
  });
});
//# sourceMappingURL=ipfs-client-methods.test.js.map