import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Food from '../lib/models/Food.js';

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

  it('getting a dish by id via GET', async () => {
    const food = await Food.insert({
      name: 'Burger',
      calories: 750,
      country: 'America'
    });

    const res = await request(app).get(`/api/v1/foods/${food.id}`);
    expect(res.body).toEqual(food);
  });

});
