import { app } from '../app';
import createConnection from '../database';
import request from 'supertest';
import { getConnection } from 'typeorm';

describe('Surveys', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new survey', async () => {
    const response = await request(app).post('/survey').send({
      title: 'title sample',
      description: 'description sample',
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('Should be able to get all surveys', async () => {
    await request(app).post('/survey').send({
      title: 'title sample 2',
      description: 'description sample 2',
    });
    const response = await request(app).get('/survey');

    //Objects don't have a .length property.
    expect(Object.keys(response.body).length).toBe(2);
  });
});
