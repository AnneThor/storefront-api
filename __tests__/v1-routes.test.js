'use strict';

process.env.SECRET = "keyboard cat";

const supergoose = require('@code-fellows/supergoose');
const { server } = require('../src/server.js');
const mockRequest = supergoose(server);

let validItem = { name: 'shirt', price: 19.99, category: 'HOUSEWARES' };
let validItemTwo = { name: 'shovel', price: 39.99, category: 'OUTDOORS' };
let invalidItem = { name: 'fork' };

describe("Unauthenticated Server Routes", () => {

  test('that POST to /:model with invalid inputs returns an error', async () => {
    await mockRequest.post('/product').send(invalidItem)
      .then(reply => {
        expect(reply.status).toBe(500);
        expect(reply.body.message).toEqual('database error');
      })
  })

  test('that GET /:model returns an empty object if no records', async () => {
    await mockRequest.get('/product')
      .then(reply => {
        expect(reply.status).toBe(200);
        expect(reply.body).toEqual([]);
      })
  })

  test('that POST to /:model creates and returns object from db', async () => {
    await mockRequest.post('/product').send(validItem)
      .then(reply => {
        expect(reply.status).toBe(201);
        expect(reply.body.name).toEqual('shirt');
        expect(reply.body._id).toBeTruthy();
      })
  })

  test('that GET /:model returns a list of model items', async () => {
    await mockRequest.post('/product').send(validItem)
      .then( await mockRequest.get('/product')
        .then(reply => {
          expect(reply.status).toBe(200);
          expect(reply.body).toBeTruthy();
          expect(reply.body[0].name).toEqual('shirt');
        }))
      })

  test('that GET to /:model/:id returns a single item by id', async () => {
    const createRec = await mockRequest.post('/product').send(validItem)
    const newItemId = createRec.body._id;
    await mockRequest.get(`/product/${newItemId}`)
      .then(reply => {
        expect(reply.status).toBe(200);
        expect(reply.body.name).toBe('shirt');
        expect(reply.body._id).toEqual(newItemId);
      })
  });

  test('that PUT to /:model/:id returns a single, updated item by id', async () => {
    let itemList = await mockRequest.get('/product');
    let item = itemList.body[0];
    let itemID = item._id;
    let updItem = { name: 'polo shirt', price: 10 };
    await mockRequest.put(`/product/${itemID}`).send(updItem)
      .then(reply => {
        expect(reply.status).toBe(200);
        expect(reply.body.name).toEqual('polo shirt');
      })
    await mockRequest.get(`/product/${itemID}`)
      .then(reply => {
        expect(reply.status).toBe(200);
        expect(reply.body.name).toEqual('polo shirt');
      })
  })

  test('that DELETE to /:model/:id returns an empty object', async () => {
    const createRec = await mockRequest.post('/product').send(validItem)
    const newItemId = createRec.body._id;
    await mockRequest.delete(`/product/${newItemId}`)
      .then(reply => {
        expect(reply.status).toBe(200);
        expect(reply.body.name).toBe('shirt');
      });
    await mockRequest.get(`/product/${newItemId}`)
      .then(reply => {
        expect(reply.status).toBe(200);
        expect(reply.body).toEqual(null);
      })
  })

})
