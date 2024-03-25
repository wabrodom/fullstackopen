import express from 'express';
import { Request } from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors<Request>());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  res.send('pong...');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`server run at port ${PORT}`);
});