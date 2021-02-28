import { app } from '../app';
import createConnection from '../database';
import request from 'supertest';

describe('Users', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it('Should be able to create a new user', async () => {
    const response = await request(app).post('/user').send({
      email: 'user@example.com',
      name: 'user name ',
    });
    expect(response.status).toBe(201);
  });

  it('Should not be able to create a user with an existing email', async () => {
    const response = await request(app).post('/user').send({
      email: 'user@example.com',
      name: 'user name ',
    });
    expect(response.status).toBe(400);
  });
});
