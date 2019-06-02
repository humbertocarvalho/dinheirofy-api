const request = require('supertest');
const app = require('../../src/app');
const truncate = require('../utils/truncate');

describe('Create wallet', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should create a wallet with valid userId', async () => {
    const response = await request(app)
      .post('/user/register')
      .send({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      });

    const { id: userId } = response.body;

    const response = await request(app)
      .post('/wallet')
      .send({
        description: 'Wallet 1',
        userId
      });

    expect(response.status).toBe(200);
  });

  it('should not create a wallet with invalid userId', async () => {
    const userId = -9999;

    const response = await request(app)
      .post('/wallet')
      .send({
        description: 'Wallet 1',
        userId
      });

    expect(response.status).toBe(401);
  });

  it('should not create a wallet with null userId', async () => {
    const response = await request(app)
      .post('/wallet')
      .send({
        description: 'Wallet 1'
      });

    expect(response.status).toBe(401);
  });
});
