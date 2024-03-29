interface exerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises  = (perDayHours: number[], target: number): exerciseResult => {

  const periodLength: number = perDayHours.length;
  const trainingDays: number = perDayHours.filter((h) => h !== 0).length;
  const totalHours: number =  perDayHours.reduce((acc, curr) => acc + curr, 0);
  const average: number = totalHours / periodLength;
  const success: boolean = average >= target;

  let rating:number = 0;
  let ratingDescription:string = '';

  if (average > target) {
    rating = 3;
    ratingDescription = 'You reach over your target';
  } else if (average === target) {
    rating = 2;
    ratingDescription = 'You meet your target';
  } else {
    rating = 1;
    ratingDescription = 'below your goal,but you could be better';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
  
};