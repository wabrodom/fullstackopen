interface exerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises  = (hours: number[]): exerciseResult => {
  const [target, ...perDayHours] = hours;

  const periodLength: number = perDayHours.length;
  const trainingDays: number = perDayHours.filter((h) => h !== 0).length;
  const totalHours: number =  perDayHours.reduce((acc, curr) => acc + curr, 0);
  const average: number = totalHours / periodLength;
  const success: boolean = average >= target;

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
    ratingDescription = 'below your goal,but you could be better'
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

const parseUseValues = (args: string[]): number[] => {

  if (args.length < 4) throw new Error('Not enough arguments');

  const useValues = []
  for (let i = 2; i < args.length; i++) {
    if ( isNaN(Number(args[i])) ) {
      throw new Error('Some provided values were not numbers!');
    }
    useValues.push(Number(args[i]))
  }
  return useValues
}


try {
  const array = parseUseValues(process.argv)
  const message = calculateExercises(array)
  console.log('your input: ', array)
  console.log(message)
} catch (error) {
  let errorMessage = 'Something went wrong. '
  if (error instanceof Error) {
    errorMessage += 'Error: ' + error.message
  }
  console.log(errorMessage)
}
