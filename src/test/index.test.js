import { expect } from 'chai';

import IpfsMultiplexer from '../index';

describe('Describe IpfsMultiplexer', () => {
  it('should correctly get a file', async () => {
    const ipfsMultiplexer = new IpfsMultiplexer();
    const response = await ipfsMultiplexer.get('QmZtmD2qt6fJot32nabSP3CUjicnypEBz7bHVDhPQt9aAy');
    expect(Array.isArray(response)).to.be.true;
    expect(response.length).to.equal(1);
    expect(response[0].content.toString('utf8')).to.equal('version 1 of my text\n');
  });

  it('should throw an error with an invalid file', async () => {
    const ipfsMultiplexer = new IpfsMultiplexer({
      timeout: 5000,
    });
    try {
      await ipfsMultiplexer.get('QmZtmD2qt6fJot32nabSP3CUjicnypEBz7bHVDhPQt9aAz');
    } catch (err) {
      expect(err.message).to.equal('The requests from all nodes failed');
    }
  });

  it.skip('should correctly save array of files and wrap them in directory', async () => {
    const ipfsMultiplexer = new IpfsMultiplexer({
      timeout: 5000,
    });
    const response = await ipfsMultiplexer.add(
      [
        { path: 'file-1', content: Buffer.from('hello 1') },
        { path: 'file-2', content: Buffer.from('hello 2') },
        { path: 'file-3', content: Buffer.from('hello 3') },
      ],
      { wrapInDirectory: true }
    );
    expect(response).to.eql([
      {
        path: 'file-1',
        hash: 'QmYU2WZfhRAhz7z5xekJkAZWznK2k27uyiH7KZct6VdCbe',
        size: 15,
      },
      {
        path: 'file-2',
        hash: 'QmYNmWVijaKZAbse8vJDrUiBk6CrksRUHepy2e14DaL4fW',
        size: 15,
      },
      {
        path: 'file-3',
        hash: 'QmT6Y6kJSpMs8hG9tD685sFtLegkddXxydL9tzZuyV6Dc3',
        size: 15,
      },
      {
        path: '',
        hash: 'QmSTaWhi6xW2L1mUprRvtw22UXFCPyzZx5d1cmwMBa1bu4',
        size: 193,
      },
    ]);
  });

  it('should correctly list files in directory', async () => {
    const ipfsMultiplexer = new IpfsMultiplexer({
      timeout: 5000,
    });
    const response = await ipfsMultiplexer.ls('QmSTaWhi6xW2L1mUprRvtw22UXFCPyzZx5d1cmwMBa1bu4');
    expect(response).to.eql([
      {
        name: 'file-1',
        path: 'QmSTaWhi6xW2L1mUprRvtw22UXFCPyzZx5d1cmwMBa1bu4/file-1',
        size: 7,
        hash: 'QmYU2WZfhRAhz7z5xekJkAZWznK2k27uyiH7KZct6VdCbe',
        type: 'file',
        depth: 1,
      },
      {
        name: 'file-2',
        path: 'QmSTaWhi6xW2L1mUprRvtw22UXFCPyzZx5d1cmwMBa1bu4/file-2',
        size: 7,
        hash: 'QmYNmWVijaKZAbse8vJDrUiBk6CrksRUHepy2e14DaL4fW',
        type: 'file',
        depth: 1,
      },
      {
        name: 'file-3',
        path: 'QmSTaWhi6xW2L1mUprRvtw22UXFCPyzZx5d1cmwMBa1bu4/file-3',
        size: 7,
        hash: 'QmT6Y6kJSpMs8hG9tD685sFtLegkddXxydL9tzZuyV6Dc3',
        type: 'file',
        depth: 1,
      },
    ]);
  });
});
