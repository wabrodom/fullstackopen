export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type DiagnosesWithoutLatin = Pick<Diagnosis, 'code' | 'name'>;