"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const getFrom=(a,b)=>{// console.log(object, selector);
if(0===b.length)return a;const[c,...d]=b;return getFrom(a[c],d)};var _default=getFrom;exports.default=_default;
//# sourceMappingURL=selector.js.map