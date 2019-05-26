const request = require('supertest');
const app = require('../../src/app');
const truncate = require('../utils/truncate');
const faker = require('faker');

describe('Register', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should register with valid inputs', async () => {
    const response = await request(app)
      .post('/user/register')
      .send({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      });

    expect(response.status).toBe(200);
  });

  it('shouldnt register with invalid inputs', async () => {
    const response = await request(app)
      .post('/user/register')
      .send({});

    expect(response.status).toBe(401);
  });

  it('should return a JWT Token when register with success', async () => {
    const response = await request(app)
      .post('/user/register')
      .send({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      });

    expect(response.body).toHaveProperty('token');
  });

  it('shouldnt return a JWT Token when register without success', async () => {
    const response = await request(app)
      .post('/user/register')
      .send({});

    expect(response.body).not.toHaveProperty('token');
  });

  it('should return an error message when the email has been already registered', async () => {
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    let response = await request(app)
      .post('/user/register')
      .send({
        name,
        email,
        password
      });

    response = await request(app)
      .post('/user/register')
      .send({
        name,
        email,
        password
      });

    expect(response.body).toHaveProperty('message');
  });

  it('should return true when the username has been already taken', async () => {
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    let response = await request(app)
      .post('/user/register')
      .send({
        name,
        email,
        password
      });

    response = await request(app).get('/user/exists/' + email);

    expect(response.body).not.toBeNull();
  });

  it('should return null when the username hasnt been taken', async () => {
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    let response = await request(app)
      .post('/user/register')
      .send({
        name,
        email,
        password
      });

    response = await request(app).get(
      '/user/exists/' + faker.internet.email('example')
    );

    expect(response.body).toBeFalsy();
  });
});
