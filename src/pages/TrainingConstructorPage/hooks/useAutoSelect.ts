import useExerciseStore from '@/shared/stores/exerciseStore';
import useTrainingStore from '@/shared/stores/trainingStore';
import { calculateAdjustedValues } from '@/shared/utils/exerciseFormulas';
import useUserStore from '@/shared/stores/userStore';
import { TargetResult } from '@/shared/types/types';

export const useAutoSelect = () => {
  const { getRandomExercises } = useExerciseStore();
  const { clearSelectedExercises, addSelectedExercise } = useTrainingStore();
  const user = useUserStore(state => state.user);

  const handleAutoSelect = (filters: {
    difficulties: string[],
    equipment: string[],
    tags: string[],
    count: number
  }) => {
    clearSelectedExercises();
    
    const exercises = getRandomExercises(
      filters.difficulties,
      filters.equipment,
      filters.tags,
      filters.count
    );


    exercises.forEach(exercise => {
      const calculatedValues = calculateAdjustedValues(
        user,
        exercise.targetResult,
        exercise.difficulty,
        exercise.averageValues
      );

      const targetValues = exercise.targetResult.reduce((acc, target) => ({
        ...acc,
        [target]: calculatedValues[target] ?? 50
      }), {} as Record<TargetResult, number>);

      addSelectedExercise(exercise, targetValues);
    });
  };

  return { handleAutoSelect };
};