export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type DiagnoseWithoutLatin = Pick<Diagnosis, 'code' | 'name'>;