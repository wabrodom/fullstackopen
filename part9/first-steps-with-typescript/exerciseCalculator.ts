interface exerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises  = (hours: number[], target: number): exerciseResult => {
  const periodLength: number = hours.length;
  const trainingDays: number = hours.filter(h => h !== 0).length;
  const totalHours: number =  hours.reduce((acc, curr) => acc + curr, 0);
  const average: number = totalHours / periodLength;
  const success: boolean = average > target;

  let rating:number = 0
  let ratingDescription:string = ''

  if (average > target) {
    rating = 3
    ratingDescription = 'You reach over your target'
  } else if (average === target) {
    rating = 2
    ratingDescription = 'You meet your target'
  } else {
    rating = 1
    ratingDescription = 'below your goal, could be better'
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
  
}


let input = [3, 0, 2, 4.5, 0, 3, 1]
console.log(calculateExercises(input, 2))