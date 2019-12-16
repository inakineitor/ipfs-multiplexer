import fetch from 'node-fetch';

const testGatewayMethod = ({ protocol, host, port, apiPath }, method) =>
  fetch(
    `${protocol}://${host}:${port}${apiPath}/${method}?arg=Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a`
  ).then(response => {
    if (response.status < 200 || response.states >= 300)
      throw new Error(response.statusText || response.status);
  });

export default testGatewayMethod;
