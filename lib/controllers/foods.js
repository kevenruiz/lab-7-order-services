/* eslint-disable indent */
import { Router } from 'express';
import FoodServices from '../../services/FoodServices.js';
import Food from '../models/Food.js';



export default Router()

  .post('/api/v1/foods', async (req, res) => {
    try {
      const food = await FoodServices.create(req.body);
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
      const food = await Food.findAll();
      res.send(food);


    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .delete('/api/v1/foods/:id', async (req, res) => {
    try {
      const food = await Food.delete(req.params.id);
      res.send(food);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .put('/api/v1/foods/:id', async (req, res) => {
    try {
      const food = await Food.put(req.body.name, req.body.calories, req.body.country, req.params.id);
      res.send(food);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });



