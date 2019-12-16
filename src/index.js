import createIpfsClient from 'ipfs-http-client';

import gateways from './gateways';
import methods from './ipfs-client-methods';
import getFrom from './selector';

class IpfsMultiplexer {
  constructor(options = {}) {
    this.options = {
      timeout: 10000,
      ...options,
    };
    // This spread order will ensure that the options argument will override the gateway's options
    this.ipfsClients = gateways.map(gateway =>
      createIpfsClient({
        ...gateway,
        ...this.options,
      })
    );
  }

  addGateway(gateway) {
    // This spread order will ensure that the function argument will override the multiplexer options
    this.ipfsClients.push(
      createIpfsClient({
        ...this.options,
        ...gateway,
      })
    );
  }
}

const createFunction = (method, optionsIndex) => {
  return function(...args) {
    const { ipfsClients } = this;
    const methodSelector = method.split('.'); // For some memory management reason, an array cannot be passed into here it has to be calculated on runtime
    const abortController = new AbortController();
    if (optionsIndex !== null && args[optionsIndex].signal === undefined)
      // eslint-disable-next-line no-param-reassign
      args[optionsIndex].signal = abortController.signal;
    return new Promise((resolve, reject) => {
      let rejected = 0;
      ipfsClients.forEach(ipfsClient => {
        getFrom(
          ipfsClient,
          methodSelector
        )(...args)
          .then(response => {
            abortController.abort();
            resolve(response);
          })
          .catch(() => {
            rejected += 1;
            if (rejected === ipfsClients.length)
              reject(new Error('The requests from all nodes failed'));
          });
      });
    });
  };
};

Object.entries(methods).forEach(([method, optionsIndex]) => {
  const methodSelector = method.split('.');
  let base = IpfsMultiplexer.prototype;
  const functionName = methodSelector.pop();
  methodSelector.forEach(selector => {
    base[selector] = base[selector] || {};
    base = base[selector];
  });
  base[functionName] = createFunction(method, optionsIndex);
});

export default IpfsMultiplexer;

// const ipfsMultiplexer = new IpfsMultiplexer();

// const date = new Date();
// ipfsMultiplexer
//   .get('Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a')
//   .then(() => console.log(`Time taken: ${new Date() - date}ms`))
//   .catch(console.error);
