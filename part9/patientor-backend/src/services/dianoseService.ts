import diagnosesData from '../../data/diagnoses';
import { Diagnosis, DiagnoseWithoutLatin } from '../types';

const getDiagnoses = ():Diagnosis[] => {
  return diagnosesData;
};

const getDiagnosesWithoutLatin = ():DiagnoseWithoutLatin[] => {
  return diagnosesData.map( ({ code ,name }) => ({ code, name}) );
};

export default {
  getDiagnoses,
  getDiagnosesWithoutLatin
};