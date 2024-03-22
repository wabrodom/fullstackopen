import express from 'express';

import { bmiApi } from './bmiCalculator'

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query

  if (typeof height === "string" && typeof weight === 'string') {
    const result = bmiApi(height, weight)
    return res.json({
      weight: weight,
      height: height,
      bmi: result
    })
  }
  return res.json({
    error: "malformatted parameters"
  })
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Start server on port ${PORT}`)
})