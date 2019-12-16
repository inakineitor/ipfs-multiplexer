"use strict";

var _chai = require("chai");

var _selector = _interopRequireDefault(require("../selector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Describe getFrom from selector module', () => {
  it('should correctly retrieve a value from a deeply nested object', () => {
    const object = {
      a: {
        b: {
          c: 'd'
        }
      }
    };
    (0, _chai.expect)((0, _selector.default)(object, ['a', 'b', 'c'])).to.equal('d');
  });
});
//# sourceMappingURL=selector.test.js.map