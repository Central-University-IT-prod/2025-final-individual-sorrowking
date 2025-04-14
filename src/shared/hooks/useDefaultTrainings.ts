import { useEffect, useRef } from 'react';
import useTrainingStore from '@/shared/stores/trainingStore';
import { v4 as uuidv4 } from 'uuid';
import useExerciseStore from '../stores/exerciseStore';

type DefaultTraining = {
  title: string;
  filter: {
    difficulties?: string[];
    tags?: string[];
    count: number;
  };
  description: string;
}

export const useDefaultTrainings = () => {
  const { trainings, addTraining } = useTrainingStore();
  const { exercises, getRandomExercises } = useExerciseStore();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && exercises.length > 0 && trainings.length < 3) {
      initialized.current = true;

      const defaultTrainings = [
        {
          title: 'Кардио тренировка',
          filter: { tags: ['кардио'], count: 3 },
          description: 'Набор полезных кардио-упражнений'
        },
        {
          title: 'Тяжелая тренировка',
          filter: { difficulties: ['hard'], count: 3 },
          description: 'Тяжелая тренировка для тех, кто хочет получить вызов'
        },
        {
          title: 'Случайная тренировка',
          filter: { count: 10 },
          description: 'Случайный набор упражнений для любителей неожиданностей'
        }
      ];

      let trainingsToGenerate: DefaultTraining[] = [];

      if (trainings.length === 0) {
        trainingsToGenerate = defaultTrainings;
      } else if (trainings.length === 1) {
        trainingsToGenerate = defaultTrainings.slice(0, 2);
      } else if (trainings.length === 2) {
        trainingsToGenerate = defaultTrainings.slice(0, 1);
      }

      trainingsToGenerate.forEach(training => {
        const selectedExercises = getRandomExercises(
          training.filter.difficulties || [],
          [],
          training.filter.tags || [],
          training.filter.count
        );

        addTraining({
          title: training.title,
          exercises: selectedExercises.map(ex => ({
            exercise: ex,
            uuid: uuidv4(),
            targetValues: ex.averageValues
          })),
          description: training.description
        });
      });
    }
  }, [exercises, trainings, addTraining, getRandomExercises]);
};