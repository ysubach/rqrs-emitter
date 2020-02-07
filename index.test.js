'use strict';

const RqrsEmitter = require('./index');

test('new object', () => {
  const rre = new RqrsEmitter();
  expect(rre).toBeDefined();
});

test('successful call - with request', async () => {
  const rre = new RqrsEmitter();
  rre.handler('test', async req => {
    expect(req.a).toBe(1);
    return 'ok';
  });
  const res = await rre.request('test', { a: 1 });
  expect(res).toBe('ok');
});

test('successful call - empty request', async () => {
  const rre = new RqrsEmitter();
  rre.handler('test', async () => 'ok');
  const res = await rre.request('test');
  expect(res).toBe('ok');
});

test('no handler error', async () => {
  const rre = new RqrsEmitter();
  try {
    await rre.request('test')
  } catch (e) {
    expect(e.toString()).toBe('Error: no handler found for [test]');
  }
});

test('remove handler', async() => {
  const rre = new RqrsEmitter();
  rre.handler('test', async () => 'ok');
  const res = await rre.request('test');
  expect(res).toBe('ok');
  
  rre.removeHandler('test');
  try {
    await rre.request('test')
    expect(null).toBe('exception not thrown');
  } catch (e) {
    expect(e.toString()).toBe('Error: no handler found for [test]');
  }
});

test('handler already exists error', async () => {
  const rre = new RqrsEmitter();
  rre.handler('test', async () => 'ok');
  try {
    rre.handler('test', async () => 'ok');
    expect(null).toBe('exception not thrown');
  } catch (e) {
    expect(e.toString()).toBe('Error: handler already exists for [test]');
  }
});

test('handler throwing exception', async () => {
  const rre = new RqrsEmitter();
  rre.handler('test', async () => {
    throw new Error('error in handler');
  });
  try {
    await rre.request('test');
    expect(null).toBe('exception not thrown');
  } catch (e) {
    expect(e.toString()).toBe('Error: error in handler');
  }
});
