'use strict';

const RqrsEmitter = require('./index');

test('new object', () => {
  const rre = new RqrsEmitter();
  expect(rre).toBeDefined();
});

//// Simple test
//// TODO: remove when regular tests done
//const ee = new RqrsEmitter();
//console.log(ee.handler);

//(async function() {
  //ee.handler('test', async function(r) {
    //console.log('Handler:', r);
    //return 'ok';
  //});
  //const res = await ee.request('test', { a: 1 });
  //console.log(res);
//})();
