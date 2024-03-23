import express from 'express';

import { bmiApi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (typeof height === "string" && typeof weight === 'string') {
    const result = bmiApi(height, weight);
    return res.json({
      weight: weight,
      height: height,
      bmi: result
    });
  }
  return res.json({
    error: "malformatted parameters"
  });
});

app.post('/exercise', (req, res) => {
  // eslint-disable-next-line
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).send({
      error: "some parameter missing"
    });
  }

  if (daily_exercises instanceof Array === false || typeof target !== 'number') {
    return res.status(400).send({
      error: "malformatted parameters"
    });
  }

  if(!daily_exercises.every(e => typeof e === 'number')) {
    return res.status(400).send({
      error: "malformatted parameters, your date input is not number"
    });
  }

  // eslint-disable-next-line 
  const result = calculateExercises(daily_exercises, target);
  return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Start server on port ${PORT}`);
});