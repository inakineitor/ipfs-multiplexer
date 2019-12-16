import { expect } from 'chai';

import gateways from '../gateways';

describe('Describe gateways', () => {
  it('should have all properties defined', () => {
    for (const { protocol, host, apiPath, port } of gateways) {
      expect(protocol).to.not.be.undefined;
      expect(host).to.not.be.undefined;
      expect(apiPath).to.not.be.undefined;
      expect(port).to.not.be.undefined;
    }
  });
});
