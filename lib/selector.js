"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const getFrom = (object, selector) => {
  // console.log(object, selector);
  if (selector.length === 0) return object;
  const [currentSelector, ...newSelector] = selector;
  return getFrom(object[currentSelector], newSelector);
};

var _default = getFrom;
exports.default = _default;
//# sourceMappingURL=selector.js.map