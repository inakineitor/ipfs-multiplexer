# IPFS Multiplexer Library

> A multiplexer library, built on top of [js-ipfs-http-client](https://github.com/ipfs/js-ipfs-http-client) and implementing the [interface-ipfs-core](https://github.com/ipfs/interface-ipfs-core).

## Lead Maintainer

[Iñaki Arango](http://github.com/inakineitor).

## Table of Contents

- [IPFS Multiplexer Library](#ipfs-multiplexer-library)
  - [Lead Maintainer](#lead-maintainer)
  - [Table of Contents](#table-of-contents)
  - [Install](#install)
    - [Importing the module and usage](#importing-the-module-and-usage)
    - [Importing helper functions](#importing-helper-functions)
    - [In a web browser](#in-a-web-browser)
    - [Custom Headers](#custom-headers)
  - [Usage](#usage)
    - [API](#api)
      - [Files](#files)
      - [Graph](#graph)
      - [Additional Options](#additional-options)
  - [Development](#development)
    - [Testing](#testing)
  - [Contribute](#contribute)
  - [Historical context](#historical-context)

## Install

This module uses node.js, and can be installed through npm:

```bash
npm install --save ipfs-multiplexer
```

We support both the Current and Active LTS versions of Node.js. Please see [nodejs.org](https://nodejs.org/) for what these currently are.

### Importing the module and usage

```javascript
import IpfsMultiplexer from 'ipfs-multiplexer';

const ipfsMultiplexer = new IpfsMultiplexer();

// Optionally, you can add your own nodes to the list of available nodes
ipfsMultiplexer.addGateway({
  host: 'localhost',
  port: 5001,
  protocol: 'http',
});

ipfsMultiplexer.get('Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a')
  .then(console.log)
  .catch(console.error);
```

### Importing helper functions

```javascript
import { testGateway } from 'ipfs-multiplexer';

testGateway({
    host: 'localhost',
    port: 5001,
    protocol: 'http',  
  })
  .then(() => {
    // Everything went fine
    console.log('The gateway is up');
  })
  .catch(err => {
    // The error thrown by the gateway during test request
    console.error(err);
  });
```

### In a web browser

**through Browserify**

Same as in Node.js, you just have to [browserify](http://browserify.org) the code before serving it. See the browserify repo for how to do that.

See the example provided by [js-ipfs-http-client](https://github.com/ipfs/js-ipfs-http-client) in the [examples folder](/examples/bundle-browserify) to get a boilerplate.

**through webpack**

See the example provided by [js-ipfs-http-client](https://github.com/ipfs/js-ipfs-http-client) in the [examples folder](/examples/bundle-webpack) to get an idea on how to use a package with webpack.

### Custom Headers

If you wish to send custom headers with each request made by this library, for example, the Authorization header. You can use the config to do so:

```javascript
ipfsMultiplexer.addGateway({
  host: 'localhost',
  port: 5001,
  protocol: 'http',
  headers: {
    authorization: 'Bearer ' + TOKEN,
  },
});
```

<!-- ### Global Timeouts

To set a global timeout for _all_ requests pass a value for the `timeout` option:

```js
// Timeout after 10 seconds
const ipfs = ipfsClient({ timeout: 10000 })
// Timeout after 2 minutes
const ipfs = ipfsClient({ timeout: '2m' })
// see https://www.npmjs.com/package/parse-duration for valid string values
``` -->

## Usage

### API

[![IPFS Core API Compatible](https://cdn.rawgit.com/ipfs/interface-ipfs-core/master/img/badge.svg)](https://github.com/ipfs/interface-ipfs-core)

> `js-ipfs-http-client` follows the spec defined by [`interface-ipfs-core`](https://github.com/ipfs/interface-ipfs-core), which concerns the interface to expect from IPFS implementations. This interface is a currently active endeavor. You can use it today to consult the methods available.

> IMPORTANTE NOTE: Due to the nature of a multiplexer, the commands from the [Network](https://github.com/ipfs/js-ipfs-http-client/blob/master/README.md#network) and [Node Management](https://github.com/ipfs/js-ipfs-http-client/blob/master/README.md#network) categories are not available. Please refere to these links to see which part of the API is not available.

#### Files

- [Regular Files API](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md)
  - [`ipfs.add(data, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add)
  - [`ipfs.addPullStream([options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#addpullstream)
  - [`ipfs.addReadableStream([options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#addreadablestream)
  - [`ipfs.addFromStream(stream)`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#addfromstream)
  - [`ipfs.addFromFs(path, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#addfromfs)
  - [`ipfs.addFromURL(url, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#addfromurl)
  - [`ipfs.cat(ipfsPath, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#cat)
  - [`ipfs.catPullStream(ipfsPath, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#catpullstream)
  - [`ipfs.catReadableStream(ipfsPath, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#catreadablestream)
  - [`ipfs.get(ipfsPath, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#get)
  - [`ipfs.getPullStream(ipfsPath, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#getpullstream)
  - [`ipfs.getReadableStream(ipfsPath, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#getreadablestream)
  - [`ipfs.ls(ipfsPath)`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#ls)
  - [`ipfs.lsPullStream(ipfsPath)`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#lspullstream)
  - [`ipfs.lsReadableStream(ipfsPath)`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#lsreadablestream)
- [MFS (mutable file system) specific](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#mutable-file-system)

  _Explore the Mutable File System through interactive coding challenges in our [ProtoSchool tutorial](https://proto.school/#/mutable-file-system/)._

  - [`ipfs.files.cp([from, to])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#filescp)
  - [`ipfs.files.flush([path])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#filesflush)
  - [`ipfs.files.ls([path], [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#filesls)
  - [`ipfs.files.mkdir(path, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#filesmkdir)
  - [`ipfs.files.mv([from, to])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#filesmv)
  - [`ipfs.files.read(path, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#filesread)
  - [`ipfs.files.readPullStream(path, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#filesreadpullstream)
  - [`ipfs.files.readReadableStream(path, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#filesreadreadablestream)
  - [`ipfs.files.rm(path, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#filesrm)
  - [`ipfs.files.stat(path, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#filesstat)
  - [`ipfs.files.write(path, content, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#fileswrite)

- [block](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/BLOCK.md)

  - [`ipfs.block.get(cid, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/BLOCK.md#blockget)
  - [`ipfs.block.put(block, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/BLOCK.md#blockput)
  - [`ipfs.block.stat(cid)`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/BLOCK.md#blockstat)

- [refs](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/REFS.md)
  - [`ipfs.refs(ipfsPath, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/REFS.md#refs)
  - [`ipfs.refsReadableStream(ipfsPath, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/REFS.md#refsreadablestream)
  - [`ipfs.refsPullStream(ipfsPath, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/REFS.md#refspullstream)
  - [`ipfs.refs.local()`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/REFS.md#refslocal)
  - [`ipfs.refs.localReadableStream()`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/REFS.md#refslocalreadablestream)
  - [`ipfs.refs.localPullStream()`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/REFS.md#refslocalpullstream)

#### Graph

- [dag](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/DAG.md)

  _Explore the DAG API through interactive coding challenges in our [ProtoSchool tutorial](https://proto.school/#/basics)._

  - [`ipfs.dag.get(cid, [path], [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/DAG.md#dagget)
  - [`ipfs.dag.put(dagNode, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/DAG.md#dagput)
  - [`ipfs.dag.tree(cid, [path], [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/DAG.md#dagtree)

- [object](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/OBJECT.md)

  - [`ipfs.object.data(multihash, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/OBJECT.md#objectdata)
  - [`ipfs.object.get(multihash, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/OBJECT.md#objectget)
  - [`ipfs.object.links(multihash, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/OBJECT.md#objectlinks)
  - [`ipfs.object.new([template])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/OBJECT.md#objectnew)
  - [`ipfs.object.patch.addLink(multihash, DAGLink, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/OBJECT.md#objectpatchaddlink)
  - [`ipfs.object.patch.appendData(multihash, data, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/OBJECT.md#objectpatchappenddata)
  - [`ipfs.object.patch.rmLink(multihash, DAGLink, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/OBJECT.md#objectpatchrmlink)
  - [`ipfs.object.patch.setData(multihash, data, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/OBJECT.md#objectpatchsetdata)
  - [`ipfs.object.put(obj, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/OBJECT.md#objectput)
  - [`ipfs.object.stat(multihash, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/OBJECT.md#objectstat)

- [pin](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/PIN.md)

  - [`ipfs.pin.add(hash, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/PIN.md#pinadd)
  - [`ipfs.pin.ls([hash], [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/PIN.md#pinls)
  - [`ipfs.pin.rm(hash, [options])`](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/PIN.md#pinrm)

- refs
  - `ipfs.refs.local()`

#### Additional Options

All core API methods take _additional_ `options` specific to the HTTP API:

- `headers` - An object or [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers) instance that can be used to set custom HTTP headers. Note that this option can also be [configured globally](#custom-headers) via the constructor options.
- `timeout` - A number or string specifying a timeout for the request. If the timeout is reached before data is received a [`TimeoutError`](https://github.com/sindresorhus/ky/blob/2f37c3f999efb36db9108893b8b3d4b3a7f5ec45/index.js#L127-L132) is thrown. If a number is specified it is interpreted as milliseconds, if a string is passed, it is intepreted according to [`parse-duration`](https://www.npmjs.com/package/parse-duration). Note that this option can also be [configured globally](#global-timeouts) via the constructor options.
- `searchParams` - An object or [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) instance that can be used to add additional query parameters to the query string sent with each request.

> NOTE: The `signal` property thas is described [here](https://github.com/ipfs/js-ipfs-http-client/blob/master/README.md#network) is not available with this package, because it is used to abort the requests that have not arrived by the time where the multiplexer already has a valid response.

## Development

### Testing

We run tests by executing `npm test` in a terminal window. This will run Node.js test.
<!-- To ensure that the module conforms with the [`interface-ipfs-core`](https://github.com/ipfs/interface-ipfs-core) spec, we run the batch of tests provided by the interface module, which can be found [here](https://github.com/ipfs/interface-ipfs-core/tree/master/js/src). -->
> NOTE: While because the package conforms with the [`interface-ipfs-core`](https://github.com/ipfs/interface-ipfs-core) spec because it extends [js-ipfs-http-client](https://github.com/ipfs/js-ipfs-http-client), the tests provided by the [interface module](https://github.com/ipfs/interface-ipfs-core/tree/master/js/src) are yet to be added to this package's tests.

## Contribute

ipfs-multiplexer is a work in progress. As such, there's a few things you can do right now to help out:

- **[Check out the existing issues](https://github.com/inakineitor/ipfx-multiplexer/issues)**!
- **Perform code reviews**. More eyes will help a) speed the project along b) ensure quality and c) reduce possible future bugs.
- **Add tests**. There can never be enough tests. Note that interface tests exist inside [`interface-ipfs-core`](https://github.com/ipfs/interface-ipfs-core/tree/master/js/src).
- **Contribute to the [js-ipfs-http-client repository](https://github.com/ipfs/js-ipfs-http-client)** by checking out issues, performing code reviews, adding tests or by contributing to their FAQ repository. Remember `ipfs-multiplexer` is based on `js-ipfs-http-client`, so every improvement it gets, helps make this package better.

## Historical context

This module started as part of [`docsit-client`](https://github.com/docsit/docsit-client) when we tried to speed up the IPFS operations of our documents, but we realized that it had so much more potential as an independent package.

<!-- ## License

[MIT](LICENSE) -->