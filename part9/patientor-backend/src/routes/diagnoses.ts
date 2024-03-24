import express from 'express';
import dianoseService from '../services/dianoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(dianoseService.getDiagnosesWithoutLatin());
});

export default router;