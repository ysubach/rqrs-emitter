# RqrsEmitter

RqrsEmitter - event emitter with request-response capability for JavaScript 
(NodeJS, ReactNative, browser).

This component extends standard event emitter with another feature layer that 
allows developers to use request-response semantics. It's useful for integration 
between software components when just emitting events is not enough because you 
expect to receive some result back from the event handler.

[EventEmitter3](https://github.com/primus/eventemitter3) is used as a foundation 
layer, please check their documentation in order to use RqrsEmitter as a basic 
event emitter (all base layer functionality is available).

## Installation

Using Yarn:
```bash
yarn add rqrs-emitter
```

Using NPM:
```bash
npm install --save rqrs-emitter
```

## Usage

### Initialization

Load the module and create RqrsEmitter instance:
```js
const RqrsEmitter = require('rqrs-emitter');
const rre = new RqrsEmitter();
```

### Request handler

Create request handler for request named `test`:
```js
rre.handler('test', async req => {
  // some work here, using "req"
  
  // send response back
  return { ok: true };
});
```

### Send request

Send `test` request with additional details:
```js
const res = await rre.request('test', { data: 1 });
// "res" contains result returned by handler
```

Additional details are optional in case handler do not require them:
```js
const res = await rre.request('test');
// "res" contains result returned by handler
```

### Remove handler

To remove handler for `test` request:
```js
rre.removeHandler('test');
```

### Exceptions

Any exceptions thrown by the handler function are re-thrown inside request 
sender execution context. So normal exception handling can be used to catch and 
process all errors.

### Method aliases

RqrsEmitter provides method aliases for adding and removing request handlers:

- `handler` method can be called as `addRequestHandler`
- `removeHandler` method can be called as `removeRequestHandler`

## Improvements

- Add ability to create multiple response handlers. Currently it allows only 1 
  response handler. In case of multiple handlers they all should be called and 
  result returned to caller should contain all responses (as array, or maybe 
  hash map if we can identify responses somehow).

## License

[MIT](LICENSE)
