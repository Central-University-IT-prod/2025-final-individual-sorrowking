import { TargetResult, Training, User } from "../types/types";

export const getTrainingDifficulty = (training: Training) => {
  let totalScore = 0;
  
  for (const selectedExercise of training.exercises) {
    switch (selectedExercise.exercise.difficulty) {
      case 'easy':
        totalScore += 1;
        break;
      case 'medium':
        totalScore += 2;
        break;
      case 'hard':
        totalScore += 3;
        break;
    }
  }
  
  return totalScore / training.exercises.length;
}

export const getTrainingDuration = (training: Training) => {
  let totalSeconds = 0;

  training.exercises.forEach((exercise) => {
    const timeValue = 'time' in exercise.targetValues ? exercise.targetValues.time : 300;
    totalSeconds += timeValue;
  });

  const restTime = (training.exercises.length - 1) * 60;
  totalSeconds += restTime;

  return Math.ceil(totalSeconds / 60);
};

// представим, что калории вычисляются по такой формуле
export const calculateCaloriesBurned = (user: User, training: Training) => {
  const difficultyScore = getTrainingDifficulty(training);
  const durationMinutes = getTrainingDuration(training);
  let difficultyCoef = 0;
  if (difficultyScore < 1.5) {
    difficultyCoef = 3
  } else if (difficultyScore < 2.5) {
    difficultyCoef = 5;
  } else {
    difficultyCoef = 7;
  }
  return Math.round((durationMinutes * difficultyCoef * 3.5 * user.weight) / 200);
};

export const checkTagsCount = (training: Training, tag: string) => {
  let count = 0;

  for (const selectedExercise of training.exercises) {
    if (selectedExercise.exercise.tags.includes(tag)) count += 1;
  }

  return count
}


export const getUnit = (param: TargetResult) => {
  if (param === 'time') return 'сек';
  if (param === 'distance') return 'м';
  if (param === 'weight') return 'кг';
  return '';
};