import { app } from '../app';
import createConnection from '../database';
import request from 'supertest';

describe('Surveys', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
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
    expect(response.body.lentgh).toBe(2);
  });
});
