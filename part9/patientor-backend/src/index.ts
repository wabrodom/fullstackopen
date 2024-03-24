import express from 'express';
import diagnosesRouter from './routes/diagnoses';

const app = express();
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  res.send('pong...');
});

app.use('/api/diagnoses', diagnosesRouter);

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`server run at port ${PORT}`);
});