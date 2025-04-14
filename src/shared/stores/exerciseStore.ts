import { create } from 'zustand';
import { persist  } from 'zustand/middleware';
import { Exercise } from '../types/types';
import useTrainingStore from './trainingStore';

interface ExerciseStore {
  exercises: Exercise[];
  likedExercises: Exercise[];
  addExercise: (exercise: Exercise) => void;
  addExercises: (exercises: Exercise[]) => void;
  updateExercise: (exerciseId: string, exercise: Exercise) => void;
  deleteExercise: (exerciseId: string) => void;
  toggleLike: (exercise: Exercise) => void;
  isLiked: (exerciseId: string) => boolean;
  getRandomExercises: (
    difficulties: string[],
    equipments: string[],
    tags: string[],
    count: number
  ) => Exercise[];
}

const useExerciseStore = create<ExerciseStore>()(
  persist(
    (set, get) => ({
      exercises: [],
      likedExercises: [],

      addExercise: (exercise) =>
        set((state) => ({ exercises: [...state.exercises, exercise] })),
      addExercises: (newExercises) =>
        set((state) => ({ exercises: [...state.exercises, ...newExercises] })),
      updateExercise: (exerciseId, updatedExercise) => {
        
        set((state) => ({
          exercises: state.exercises.map(e => 
            e.exerciseId === exerciseId ? updatedExercise : e
          ),
          likedExercises: state.likedExercises.map(e => 
            e.exerciseId === exerciseId ? updatedExercise : e
          )
        }));

      
        // Автоматическое обновление связанных данных
        useTrainingStore.getState().updateExercisesInTrainings(exerciseId, updatedExercise);
      },
      deleteExercise: (exerciseId) => {
        set((state) => ({
          exercises: state.exercises.filter((exercise) => exercise.exerciseId !== exerciseId),
          likedExercises: state.likedExercises.filter((exercise) => exercise.exerciseId !== exerciseId)
        }));

        useTrainingStore.getState().deleteExerciseInTrainings(exerciseId);
      },

        

      toggleLike: (exercise) => {
        const { likedExercises } = get();
        const isExerciseLiked = likedExercises.some(
          (liked) => liked.exerciseId === exercise.exerciseId
        );

        if (isExerciseLiked) {
          set((state) => ({
            likedExercises: state.likedExercises.filter(
              (liked) => liked.exerciseId !== exercise.exerciseId
            ),
          }));
        } else {
          set((state) => ({
            likedExercises: [...state.likedExercises, exercise],
          }));
        }
      },
      isLiked: (exerciseId) =>
        get().likedExercises.some((liked) => liked.exerciseId === exerciseId),

      // получение рандомного списка тренировок
      getRandomExercises: (difficulties, equipments, tags, count) => {
        const { exercises } = get();
        
        const filteredExercises = exercises.filter(exercise => {
          const matchesDifficulty = difficulties.length === 0 || 
            difficulties.includes(exercise.difficulty);
          
          const matchesEquipment = equipments.length === 0 ||
            exercise.equipment.some(e => equipments.includes(e));
          
          const matchesTags = tags.length === 0 ||
            (exercise.tags?.some(t => tags.includes(t)) ?? false);

          return matchesDifficulty && matchesEquipment && matchesTags;
        });

        const shuffled = [...filteredExercises];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        return shuffled.slice(0, count);
      },

    }),
    {
      name: 'exercise-store',
    } 
  ) 
);

export default useExerciseStore;