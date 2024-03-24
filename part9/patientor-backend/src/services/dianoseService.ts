import diagnosesData from '../../data/diagnoses';
import { Diagnosis, DiagnosesWithoutLatin } from '../types';

const getDiagnoses = ():Diagnosis[] => {
  return diagnosesData;
};

const getDiagnosesWithoutLatin = ():DiagnosesWithoutLatin[] => {
  return diagnosesData.map( ({ code ,name }) => ({ code, name}) );
};

export default {
  getDiagnoses,
  getDiagnosesWithoutLatin
};