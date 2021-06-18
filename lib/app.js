import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import foodController from '../lib/controllers/foods.js';

const app = express();

app.use(express.json());
app.use(foodController);

if (app) {
  console.log('hi');
}

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;
