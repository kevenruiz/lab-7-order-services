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

  it('getting all the dishes the dish by GET', async () => {


    const pizza = await Food.insert({
      name: 'pizza Margarita',
      calories: 450,
      country: 'Italia'
    });

    const taco = await Food.insert({
      name: 'taco de chorizo',
      calories: 1,
      country: 'Mexico'
    });

    const gyro = await Food.insert({
      name: 'Lamb Gyro',
      calories: 35,
      country: 'Greece'
    });

    const res = await request(app).get('/api/v1/foods');
    expect(res.body).toEqual([pizza, taco, gyro]);


  });

  it('delete a food named taco', async () => {
    const byeTaco = await Food.insert({
      name: 'Taco was eaten',
      calories: 0,
      country: 'Mexico'
    });

    const res = await request(app).delete(`/api/v1/foods/${byeTaco.id}`);
    expect(res.body).toEqual(byeTaco);
  });

  it('update something', async () => {
    const meatTaco = await Food.insert({
      name: 'non-veggie',
      calories: 100,
      country: 'Mexico'
    });
    const changedMyMindTaco = await Food.insert({
      id: '2',
      name: 'veggie taco',
      calories: 0,
      country: 'not-mexico lol'
    });

    const res = await request(app).put(`/api/v1/foods/${meatTaco.id}`).send(changedMyMindTaco);

    expect(res.body).toEqual({
      id: '1',
      name: 'veggie taco',
      calories: 0,
      country: 'not-mexico lol'
    });
  });

  it('creates a new order in our database and send a text message', async () => {
    return request(app)
      .post('api/v1/foods')
      .send({ name: 'First text', calories: 25, country: 'Mexico' })
      .then((res) => {
        expect(res.body).toEqual({ id: '1', name: 'First text' });
      });
  });

});
