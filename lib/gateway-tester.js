"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testGatewayMethod = ({
  protocol,
  host,
  port,
  apiPath
}, method) => (0, _nodeFetch.default)(`${protocol}://${host}:${port}${apiPath}/${method}?arg=Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a`).then(response => {
  if (response.status < 200 || response.states >= 300) throw new Error(response.statusText || response.status);
});

var _default = testGatewayMethod;
exports.default = _default;
//# sourceMappingURL=gateway-tester.js.map