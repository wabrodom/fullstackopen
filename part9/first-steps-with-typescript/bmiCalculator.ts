console.log("BMI calculator")
console.log("Enter the height (cm) and weight (kg)")

const calculateBmi = (height: number, weight: number): number => {
  if (height <= 0) {
    throw new Error("height is in cm and should greater than zero");
  } 

  const bmi:number = weight / Math.pow(height/100 , 2);
  return bmi
}

const bmiMessage = (bmi: number): string => {
  if (bmi < 18.5) {
    return `${bmi} : Underweight`;
  } else if (bmi < 25) {
    return `${bmi} : Normal range`;
  } else if (bmi < 30) {
    return `${bmi} : Overweight (Pre-obese)`;
  } else {
    return `${bmi} : Obese`;
  }
}

const showBmi = (height: number, weight: number):string => {
  let bmi:number = calculateBmi(height, weight);
  return bmiMessage(bmi);
}

interface heightWeight {
  height: number;
  weight: number;
}

const parseArgument = (args: string[]): heightWeight => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}


try {
  const { height, weight } = parseArgument(process.argv);

  console.log(showBmi(height, weight));
} catch(error) {
  let errorMessage = 'Something went wrong! '
  if (error instanceof Error) {
    errorMessage += error.message
  }
  console.log(errorMessage)
}