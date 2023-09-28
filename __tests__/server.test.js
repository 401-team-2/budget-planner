'use strict';

const request = require('supertest');
const { server } = require('../src/server');
const { db } = require('../src/models');

let userData = {
  testUser: { username: 'user', password: 'password', role: 'user' },
};

describe('Transaction Routes Tests', () => {
  beforeAll(async () => {
    await db.sync({ force: true }); // This will recreate the database tables
  });

  afterAll(async () => {
    await db.close();
  });

  it('Can create a new user', async () => {
    const response = await request(server).post('/signup').send(userData.testUser);
    const userObject = response.body;
    expect(response.status).toBe(201);
    expect(userObject.token).toBeDefined();
    expect(userObject.user.id).toBeDefined();
    expect(userObject.user.username).toEqual(userData.testUser.username);
  });

  it('Can signin with basic auth string', async () => {
    let { username, password } = userData.testUser;
    const response = await request(server).post('/signin')
      .auth(username, password);
    const userObject = response.body;
    expect(response.status).toBe(200);
    expect(userObject.token).toBeDefined();
    expect(userObject.user.id).toBeDefined();
    expect(userObject.user.username).toEqual(username);
  });

  it('POST /api/transactions adds a transaction to the DB and returns an object with the added transaction', async () => {
    const newTransaction = {
      category: 'Test',
      date: new Date(),
      amount: 100.0,
    };
    const response = await request(server)
      .post('/api/transactions')
      .send(newTransaction);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('GET /api/transactions returns a list of transactions', async () => {
    const response = await request(server).get('/api/transactions');
    expect(response.status).toBe(200);
  });

  it('GET /api/transactions/ID returns a single transaction by ID', async () => {
    const transactionId = 1;
    const response = await request(server).get(`/api/transactions/${transactionId}`);
    expect(response.status).toBe(200);
  });

  it('PUT /api/transactions/ID returns a single, updated transaction by ID', async () => {
    const transactionId = 1;
    const updatedTransaction = {
      category: 'Updated Test',
      date: new Date(),
      amount: 150.0,
    };
    const response = await request(server)
      .put(`/api/transactions/${transactionId}`)
      .send(updatedTransaction);
    expect(response.status).toBe(200);
  });

  it('User cannot delete transactions due to lack of permissions', async () => {
    let { username, password } = userData.testUser;
    const authResponse = await request(server).post('/signin').auth(username, password);
    const authToken = authResponse.body.token;
  
    const transactionId = 1;
    const deleteResponse = await request(server)
      .delete(`/api/transactions/${transactionId}`)
      .set('Authorization', `Bearer ${authToken}`);
      
    expect(deleteResponse.status).toBe(403);
  });
  
});
