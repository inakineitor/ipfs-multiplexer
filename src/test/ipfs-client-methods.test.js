import { expect } from 'chai';

import methods from '../ipfs-client-methods';

describe('Describe ipfs client methods', () => {
  it('should have valid values', () => {
    for (const method in methods) {
      const optionsIndex = methods[method];
      expect(optionsIndex).to.satisfy(index => index === null || index >= 0);
    }
  });
});
