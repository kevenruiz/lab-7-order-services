import { Router } from 'express';
import Food from '../models/Food.js';


export default Router()
  .post('/api/v1/foods', async (req, res) => {
    try {
      const food = await Food.insert(req.body);
      res.send(food);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .get('/api/v1/foods/:id', async (req, res) => {
    try {
      const food = await Food.findById(req.params.id);
      res.send(food);

    } catch (err) {
      res.status(500).send({ error: err.message });
    }

  })
  .get('/api/v1/foods', async (req, res) => {
    try {
      const food = await
      // building the test, be right back

    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });


