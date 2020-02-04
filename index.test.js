'use strict';

const RqrsEmitter = require('./index');

test('new object', () => {
  const rre = new RqrsEmitter();
  expect(rre).toBeDefined();
});

test('successful call', async () => {
  const rre = new RqrsEmitter();
  rre.handler('test', async req => 'ok' );
  const res = await rre.request('test', { a: 1 });
  expect(res).toBe('ok');
});
