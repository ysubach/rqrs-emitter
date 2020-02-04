'use strict';

const EventEmitter = require('eventemitter3');

/**
 * Creates new RqrsEmitter object instance, it uses EventEmitter
 * as a parent
 */
function RqrsEmitter() {
  EventEmitter.call(this);
  this.handlersMap = {};
}

// Build prototype
RqrsEmitter.prototype = Object.create(EventEmitter.prototype);

// Returns internal event name based on incoming event
function rqrsEvent(event) {
  return '_rqrs_' + event;
}

// Returns random string
function rndstr() {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * Send new request
 * @param event - Event name
 * @param data - Request data
 */
RqrsEmitter.prototype.request = async function(event, data) {
  return new Promise((function(resolve, reject) {
    const reqId = rndstr() + rndstr();
    const respEvent = reqId + rqrsEvent(event);
    this.once(respEvent, function(res) {
      resolve(res);
    });
    const r = this.emit(rqrsEvent(event), { 
      id: reqId, 
      data: data 
    });
    // r = true | false -- had listeners
    if (!r) {
      this.removeListener(respEvent);
      reject(new Error(`no handler found for [${event}]`));
    }
  }).bind(this));
}

/**
 * Add request handler
 * @param event - Event name
 * @param handlerFn - Request handler function (must be async)
 */
RqrsEmitter.prototype.addRequestHandler = function(event, handlerFn) {
  if (this.handlersMap[event]) {
    throw new Error(`handler already exists for [${event}]`);
  }
  const r = this.on(rqrsEvent(event), async function(req) {
    const res = await handlerFn(req.data);
    this.emit(req.id + rqrsEvent(event), res);
  });
  this.handlersMap[event] = true;
  return r;
}

/**
 * Remove request handler
 * @param event - Event name
 */
RqrsEmitter.prototype.removeRequestHandler = function(event) {
  const r = this.removeListener(rqrsEvent(event));
  delete this.handlersMap[event];
  return r;
}

//
// Aliases
//
RqrsEmitter.prototype.handler = RqrsEmitter.prototype.addRequestHandler;
RqrsEmitter.prototype.removeHandler = RqrsEmitter.prototype.removeRequestHandler;

// Export
module.exports = RqrsEmitter;
