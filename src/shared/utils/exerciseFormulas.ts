import { User } from "../types/types";
import { TargetResult, AverageValue } from "../types/types";
type Difficulty = 'easy' | 'medium' | 'hard';

// Базовые константы
const BASE_AGE = 30;
const MALE_AVG_WEIGHT = 75;
const FEMALE_AVG_WEIGHT = 65;
const MALE_AVG_HEIGHT = 175;
const FEMALE_AVG_HEIGHT = 165;

const AGE_COEFFICIENT = {
  STRENGTH: {
    MAX: 1.3,    
    MIN: 0.7,   
    PER_YEAR: 0.02 
  },
  ENDURANCE: {
    MAX: 1.25, 
    MIN: 0.65,  
    PER_YEAR: 0.03 
  }
};


// Коэффициенты полов
const GENDER_FACTORS = {
  STRENGTH: {
    MALE: 1.0,
    FEMALE: 0.72 
  },
  REPEATS: {
    MALE: 1.0,
    FEMALE: 0.78  
  },
  TIME: {
    MALE: 1.0,
    FEMALE: 0.85 
  },
  DISTANCE: {
    MALE: 1.0,
    FEMALE: 0.88  
  }
};

// Параметры роста
const HEIGHT_EXPONENTS = {
  WEIGHT: -0.85, 
  REPEATS: -0.45, 
  TIME: 0.55,   
  DISTANCE: 0.75  
};

// Весовые коэффициенты
const WEIGHT_EXPONENTS = {
  WEIGHT: 0.65,   
  REPEATS: 0.4,   
  TIME: 0.5,     
  DISTANCE: 0.25 
};

// Коэффициенты сложности
const DIFFICULTY_FACTORS = {
  easy: 1.2,
  medium: 1.0,
  hard: 0.8
} as const;

// Ограничения коэффициентов
const COEFFICIENT_LIMITS = {
  MAX: 1.5,
  MIN: 0.6
};

// Основная функция расчета множителя
export const calculateMultiplier = (
  user: User,
  targetType: TargetResult
): number => {
  let ageCoeff = 1;
  let genderCoeff = 1;
  let weightCoeff = 1;
  let heightCoeff = 1;

  // Расчет возрастного коэффициента
  const ageDiff = BASE_AGE - user.age;
  
  switch (targetType) {
    case 'repeats':
    case 'weight':
      ageCoeff = Math.min(
        AGE_COEFFICIENT.STRENGTH.MAX,
        Math.max(
          AGE_COEFFICIENT.STRENGTH.MIN,
          1 + ageDiff * AGE_COEFFICIENT.STRENGTH.PER_YEAR
        )
      );
      break;
    
    case 'time':
    case 'distance':
      ageCoeff = Math.min(
        AGE_COEFFICIENT.ENDURANCE.MAX,
        Math.max(
          AGE_COEFFICIENT.ENDURANCE.MIN,
          1 + ageDiff * AGE_COEFFICIENT.ENDURANCE.PER_YEAR
        )
      );
      break;
  }

  const avgHeight = user.gender === 'male' 
    ? MALE_AVG_HEIGHT 
    : FEMALE_AVG_HEIGHT;
  const heightRatio = user.height / avgHeight;

  switch (targetType) {
    case 'weight':
      heightCoeff = Math.pow(heightRatio, HEIGHT_EXPONENTS.WEIGHT);
      genderCoeff = user.gender === 'male' 
        ? GENDER_FACTORS.STRENGTH.MALE 
        : GENDER_FACTORS.STRENGTH.FEMALE;
      break;

    case 'repeats':
      heightCoeff = Math.pow(heightRatio, HEIGHT_EXPONENTS.REPEATS);
      genderCoeff = user.gender === 'male' 
        ? GENDER_FACTORS.REPEATS.MALE 
        : GENDER_FACTORS.REPEATS.FEMALE;
      break;

    case 'time':
      heightCoeff = Math.pow(heightRatio, HEIGHT_EXPONENTS.TIME);
      genderCoeff = user.gender === 'male' 
        ? GENDER_FACTORS.TIME.MALE 
        : GENDER_FACTORS.TIME.FEMALE;
      break;

    case 'distance':
      heightCoeff = Math.pow(heightRatio, HEIGHT_EXPONENTS.DISTANCE);
      genderCoeff = user.gender === 'male' 
        ? GENDER_FACTORS.DISTANCE.MALE 
        : GENDER_FACTORS.DISTANCE.FEMALE;
      break;
  }

  // Расчет весовых коэффициентов
  const avgWeight = user.gender === 'male' 
    ? MALE_AVG_WEIGHT 
    : FEMALE_AVG_WEIGHT;

  switch (targetType) {
    case 'weight':
      weightCoeff = Math.pow(user.weight / avgWeight, WEIGHT_EXPONENTS.WEIGHT);
      break;
    
    case 'repeats':
      weightCoeff = Math.pow(user.weight / avgWeight, WEIGHT_EXPONENTS.REPEATS);
      break;
    
    case 'time':
      weightCoeff = Math.pow(avgWeight / user.weight, WEIGHT_EXPONENTS.TIME);
      break;
    
    case 'distance':
      weightCoeff = Math.pow(avgWeight / user.weight, WEIGHT_EXPONENTS.DISTANCE);
      break;
  }

  // Итоговый коэффициент с ограничениями
  const totalCoeff = ageCoeff * genderCoeff * weightCoeff * heightCoeff;
  return parseFloat(
    Math.min(
      COEFFICIENT_LIMITS.MAX, 
      Math.max(
        COEFFICIENT_LIMITS.MIN, 
        totalCoeff
      )
    ).toFixed(2)
  );
};

export const calculateAdjustedValues = (
  user: User,
  targetResult: TargetResult[],
  difficulty: Difficulty,
  averageValues: AverageValue | undefined
): Partial<Record<TargetResult, number>> => {
  const result: Partial<Record<TargetResult, number>> = {};

  if (!averageValues) return result;

  const isRunning = targetResult.includes('distance') && targetResult.includes('time');

  for (const targetType of targetResult) {
    const baseValue = averageValues[targetType];
    if (baseValue === undefined) continue;

    if (isRunning && targetType === 'time') {
      result[targetType] = baseValue;
      continue;
    }

    const multiplier = calculateMultiplier(user, targetType);
    const difficultyFactor = DIFFICULTY_FACTORS[difficulty];
    let adjustedValue = baseValue * multiplier * difficultyFactor;

    // Применяем округление
    switch (targetType) {
      case 'weight':
        adjustedValue = Math.round(adjustedValue * 2) / 2; 
        break;
      case 'time':
        adjustedValue = Math.round(adjustedValue / 5) * 5; 
        break;
      case 'distance':
        adjustedValue = Math.round(adjustedValue / 100) * 100; 
        break;
      default:
        adjustedValue = Math.round(adjustedValue);
    }

    result[targetType] = adjustedValue;
  }

  return result;
};
