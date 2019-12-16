"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _ipfsHttpClient=_interopRequireDefault(require("ipfs-http-client")),_gateways=_interopRequireDefault(require("./gateways")),_ipfsClientMethods=_interopRequireDefault(require("./ipfs-client-methods")),_selector=_interopRequireDefault(require("./selector"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}class IpfsMultiplexer{constructor(a={}){// This spread order will ensure that the options argument will override the gateway's options
this.options={timeout:1e4,...a},this.ipfsClients=_gateways.default.map(a=>(0,_ipfsHttpClient.default)({...a,...this.options}))}addGateway(a){// This spread order will ensure that the function argument will override the multiplexer options
this.ipfsClients.push((0,_ipfsHttpClient.default)({...this.options,...a}))}}const createFunction=(a,b)=>function(...c){const{ipfsClients:d}=this,e=a.split("."),f=new AbortController;return null!==b&&void 0===c[b].signal&&(// eslint-disable-next-line no-param-reassign
c[b].signal=f.signal),new Promise((a,b)=>{let g=0;d.forEach(h=>{(0,_selector.default)(h,e)(...c).then(b=>{f.abort(),a(b)}).catch(()=>{g+=1,g===d.length&&b(new Error("The requests from all nodes failed"))})})})};Object.entries(_ipfsClientMethods.default).forEach(([a,b])=>{const c=a.split(".");let d=IpfsMultiplexer.prototype;const e=c.pop();c.forEach(a=>{d[a]=d[a]||{},d=d[a]}),d[e]=createFunction(a,b)});var _default=IpfsMultiplexer;// const ipfsMultiplexer = new IpfsMultiplexer();
// const date = new Date();
// ipfsMultiplexer
//   .get('Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a')
//   .then(() => console.log(`Time taken: ${new Date() - date}ms`))
//   .catch(console.error);
exports.default=_default;
//# sourceMappingURL=index.js.map