export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type DiagnoseWithoutLatin = Pick<Diagnosis, 'code' | 'name'>;


export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type PatientWithoutSsn = Omit<Patient, 'ssn'>;