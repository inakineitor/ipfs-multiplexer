import { expect } from 'chai';

import getFrom from '../selector';

describe('Describe getFrom from selector module', () => {
  it('should correctly retrieve a value from a deeply nested object', () => {
    const object = {
      a: {
        b: {
          c: 'd'
        }
      }
    };
    expect(getFrom(object, ['a', 'b', 'c'])).to.equal('d');
  });
});
