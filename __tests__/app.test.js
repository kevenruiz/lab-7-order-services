import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('testing out the routes for food orders', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creating dish with the POST route', async () => {
    const res = await request(app)
      .post('/api/v1/foods')
      .send({ name: 'Alfredo', calories: 500, country: 'Italia' });

    expect(res.body).toEqual({
      id: '1',
      name: 'Alfredo',
      calories: 500,
      country: 'Italia'

    });

  });
});
