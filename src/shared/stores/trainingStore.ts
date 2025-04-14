import { Exercise } from '@/shared/types/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import {SelectedExercise, Training} from '@/shared/types/types';

interface TrainingData {
  title: string,
  exercises: SelectedExercise[],
  description?: string,
  oneshot?: boolean
}

interface TrainingStore {
  trainings: Training[];
  editingTrainingId: string | null;
  editingTraining: Training | null; 
  selectedExercises: SelectedExercise[];  // настроенные упражнения в тренировке
  runningTraining: Training | null

  addTraining: (trainingData: TrainingData) => void;
  updateTraining: (trainingId: string, updatedTrainingData: TrainingData) => void;
  getTrainingBySelectedExerciseId: (selectedExerciseId: string) => Training | undefined;
  deleteTraining: (trainingId: string) => void;
  addSelectedExercise: (exercise: Exercise, targetValues: Record<string, number>) => void;
  updateSelectedExercise: (uuid: string, targetValues: Record<string, number>) => void;
  deleteSelectedExercise: (uuid: string) => void;
  reorderSelectedExercises: (exercises: SelectedExercise[]) => void;
  clearSelectedExercises: () => void;
  selectEditingTraining: (training: Training) => void;
  selectRunnningTraining: (training: Training) => void;
  deleteExerciseInTrainings: (exerciseId: string) => void;
  updateExercisesInTrainings: (exerciseId: string, updatedExercise: Exercise) => void
  getTrainingTitlesByExerciseId: (exerciseId: string) => string[];

  startEditingTraining: (training: Training) => void;
  clearEditing: () => void;
  clearRunning: () => void;
}

const useTrainingStore = create<TrainingStore>()(
  persist(
    (set, get) => ({
      trainings: [],
      selectedExercises: [],
      runningTraining: null,
      editingTraining: null,
      editingTrainingId: null,
      
      selectEditingTraining: (training) => set({ editingTraining: training }),
      selectRunnningTraining: (training) => set({ runningTraining: training }),

      addTraining: (trainingData: TrainingData) =>
        set((state) => ({
          trainings: [
            ...state.trainings,
            {
              ...trainingData,
              id: uuidv4(),
              createdAt: new Date(),
            },
          ],
        })),

      updateTraining: (id, updatedTraining) =>
        set(state => ({
          trainings: state.trainings.map(t => 
            t.id === id
              ? { 
                  ...t,
                  ...updatedTraining,
                }
              : t
          )
        })),
      
      getTrainingBySelectedExerciseId: (selectedExerciseId: string) => {
        return get().trainings.find(training =>
          training.exercises.some(ex => ex.uuid === selectedExerciseId)
        );
      },

      deleteTraining: (trainingId) => 
        set((state) => ({
          trainings: state.trainings.filter(training => training.id !== trainingId)
        })),

      addSelectedExercise: (exercise, targetValues) =>
        set((state) => ({
          selectedExercises: [
            ...state.selectedExercises,
            { exercise, uuid: uuidv4(), targetValues },
          ],
        })),

      updateSelectedExercise: (uuid, targetValues) =>
        set((state) => ({
          selectedExercises: state.selectedExercises.map((selectedExercise) =>
            selectedExercise.uuid === uuid
              ? { ...selectedExercise, targetValues }
              : selectedExercise
          ),
        })),

      deleteSelectedExercise: (uuid) =>
        set((state) => ({
          selectedExercises: state.selectedExercises.filter((ex) => ex.uuid !== uuid),
        })),

      reorderSelectedExercises: (exercises) =>
        set(() => ({ selectedExercises: exercises })),

      clearSelectedExercises: () => set(() => ({ selectedExercises: [] })),

      deleteExerciseInTrainings: (exerciseId) => {
        set((state) => ({
          selectedExercises: state.selectedExercises.filter((ex) => ex.exercise.exerciseId  !== exerciseId),
          trainings: state.trainings.map(training => ({
            ...training,
            exercises: training.exercises.filter((ex) => ex.exercise.exerciseId  !== exerciseId),
          })).filter(training => training.exercises.length != 0)
        }));
      },
      updateExercisesInTrainings: (exerciseId, updatedExercise) => {
        set((state) => ({
          selectedExercises: state.selectedExercises.map(ex => 
            ex.exercise.exerciseId === exerciseId
              ? { ...ex, exercise: updatedExercise } 
              : ex
          ),
          trainings: state.trainings.map(training => ({
            ...training,
            exercises: training.exercises.map(ex => 
              ex.exercise.exerciseId === updatedExercise.exerciseId 
                ? { ...ex, exercise: updatedExercise } 
                : ex
            )
          }))
        }));
      },

      getTrainingTitlesByExerciseId: (exerciseId) => {
        return get().trainings.filter(training => 
          training.exercises.some(ex => ex.exercise.exerciseId === exerciseId)
        ).map(training => training.title);
      },

      startEditingTraining: (training) => 
        set({
          editingTrainingId: training.id,
          selectedExercises: training.exercises,
          editingTraining: training
        }),

      
      clearEditing: () => set({ editingTrainingId: null, editingTraining: null, selectedExercises: []}),
      clearRunning: () => set({ runningTraining: null, selectedExercises: [] }),
    }),
    {
      name: 'training-store', 
    } 
  )
);


export default useTrainingStore;