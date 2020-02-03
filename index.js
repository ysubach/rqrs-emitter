'use strict';

const EventEmitter = require('eventemitter3');

function RqrsEmitter() {
  EventEmitter.call(this);
}

RqrsEmitter.prototype = Object.create(EventEmitter.prototype);

function rqrsEvent(event) {
  return '_rqrs_' + event;
}

function rndstr() {
  return Math.random().toString(36).substring(2, 15);
}

RqrsEmitter.prototype.request = async function(event, data) {
  return new Promise((function(resolve, reject) {
    const reqId = rndstr() + rndstr();
    this.once(reqId + rqrsEvent(event), function(res) {
      console.log('Response:', res);
      resolve(res);
    });
    const r = this.emit(rqrsEvent(event), { 
      id: reqId, 
      data: data 
    });
    // r = true | false -- had listeners
    //return 'xxx';
  }).bind(this));
}

RqrsEmitter.prototype.addRequestHandler = function(event, handlerFn) {
  return this.on(rqrsEvent(event), async function(req) {
    console.log('Request:', req);
    const res = await handlerFn(req.data);
    this.emit(req.id + rqrsEvent(event), res);
  });
}

//RqrsEmitter.prototype.removeRequestHandler = function(event, handlerFn) {
//}

RqrsEmitter.prototype.removeAllRequestHandlers = function(event) {
  return this.removeListener(rqrsEvent(event));
}

//
// Aliases
//
RqrsEmitter.prototype.handler = RqrsEmitter.prototype.addRequestHandler;
RqrsEmitter.prototype.removeHandlers = RqrsEmitter.prototype.removeAllRequestHandlers;

// Export
module.exports = RqrsEmitter;
