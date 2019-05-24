const request = require('supertest');
const app = require('../../src/app');
const truncate = require('../utils/truncate');
const factory = require('../factories');

describe('Register', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should register with valid inputs', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/user/register')
      .send({
        user
      });

    expect(response.status).toBe(200);
  });

  it('shouldnt register with invalid inputs', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/user/register')
      .send({});

    expect(response.status).toBe(401);
  });

  it('should return a JWT Token when register with success', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/user/register')
      .send({
        user
      });

    expect(response.header).toHaveProperty('token');
  });
});
