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

Jump to sections below:

* [Installation](#installation)
* [Usage](#usage)
* [Usage with TypeScript](#usage-with-typescript)
* [Improvements](#improvements)
* [License](#license)


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


## Usage with TypeScript

### Event types

Define event types that will be processed by event emitter. Each event must 
incorporate following parts:
- `type: string` - defines event name as a simple string
- `request` - defines request types
- `response` - defines response type

Example:
```
type AppleEvent = {
  type: 'apple',
  request: number,
  response: string
};
```

In case you need event only to be used with `emit` method, which means no 
response is expected, define response type as `never`.

Example:
```
type OrangeEvent = {
  type: 'orange',
  request: string,
  response: never
};
```

### Initialization

Use one or more event types to instantiate new RqrsEmitter object. Examples:
```
const rre = new RqrsEmitter<AppleEvent>();
// OR
const rre = new RqrsEmitter<AppleEvent|OrangeEvent>();
// OR
type MyEvents = AppleEvent | OrangeEvent;
const rre = new RqrsEmitter<MyEvents>();
```

### Typed method calls

Specify event type for each request/response method or standard event emitter 
method.

Example:
```
rre.handler<AppleEvent>('apple', (req: number) => 'ok');
const resp = await rre.request<AppleEvent>('apple', 1);
// resp equals 'ok'
```

Example without response:
```
rre.on<OrangeEvent>('orange', (req: string) => { /* do something */ });
rre.emit<OrangeEvent>('orange', 'hello');
```

## Improvements

- Add ability to create multiple response handlers. Currently it allows only 1 
  response handler. In case of multiple handlers they all should be called and 
  result returned to caller should contain all responses (as array, or maybe 
  hash map if we can identify responses somehow).


## License

[MIT](LICENSE)
