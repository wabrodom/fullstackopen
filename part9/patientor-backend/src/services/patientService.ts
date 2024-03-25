import patientsData from '../../data/patients';
import { PatientWithoutSsn } from '../types';


const getPatients = ():PatientWithoutSsn[] => {
  return patientsData.map( ({ id, name, dateOfBirth, gender, occupation })=> ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }) );
};

export default {
  getPatients
};