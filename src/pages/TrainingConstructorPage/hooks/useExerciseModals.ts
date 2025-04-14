import { useState } from 'react';
import { Exercise, SelectedExercise, TargetResult } from '@/shared/types/types';
import useTrainingStore from '@/shared/stores/trainingStore';
import { calculateAdjustedValues } from '@/shared/utils/exerciseFormulas';
import useUserStore from '@/shared/stores/userStore';
import { toast } from 'react-toastify';

export const useExerciseModals = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTrainingSaveModalOpen, setIsTrainingSaveModalOpen] = useState(false);
  const [isAutoSelectModalOpen, setIsAutoSelectModalOpen] = useState(false);

  const [modalTab, setModalTab] = useState<'all' | 'liked'>('all');
  const [targetExercise, setTargetExercise] = useState<SelectedExercise | null>(null);
  const [highLoadNotificationChecked, setHighLoadNotificationChecked] = useState(false);
  
  const user = useUserStore(state => state.user);
  const { addSelectedExercise, updateSelectedExercise } = useTrainingStore();

  // Добавление нового упражнения
  const handleSelectExercise = (exercise: Exercise) => {
    const calculatedValues = calculateAdjustedValues(
      user,
      exercise.targetResult,
      exercise.difficulty,
      exercise.averageValues
    );
    
    const initialTargetValues = exercise.targetResult.reduce((acc, target) => ({
      ...acc,
      [target]: calculatedValues[target] ?? 50
    }), {} as Record<string, number>);

    addSelectedExercise(exercise, initialTargetValues);
    setIsAddModalOpen(false);
  };

  // Сохранение параметров
  const handleSaveExerciseParams = (exercise: SelectedExercise, values: Record<string, number>) => {
    if (!highLoadNotificationChecked) {
      const calculatedValues = calculateAdjustedValues(
        user,
        exercise.exercise.targetResult,
        exercise.exercise.difficulty,
        exercise.exercise.averageValues
      );

      const hasExcessiveLoad = Object.keys(values).some(key => {
        const calculated = calculatedValues[key as TargetResult];
        return calculated && calculated * 1.5 < values[key];
      });

      if (hasExcessiveLoad) {
        toast.error('Выставленные параметры для этого упражнения превышают допустимую нагрузку, уверены, что хотите продолжить?');
        setHighLoadNotificationChecked(true);
        return;
      }
    }

    updateSelectedExercise(exercise.uuid, values);
    setIsEditModalOpen(false);
    setHighLoadNotificationChecked(false);
  };

  const openTrainingSaveModal = () => setIsTrainingSaveModalOpen(true);
  const closeTrainingSaveModal = () => setIsTrainingSaveModalOpen(false);

  const openAutoSelectModal = () => setIsAutoSelectModalOpen(true);
  const closeAutoSelectModal = () => setIsAutoSelectModalOpen(false);


  return {
    isAddModalOpen,
    isEditModalOpen,
    isTrainingSaveModalOpen,
    isAutoSelectModalOpen,
    
    setIsAddModalOpen,
    setIsEditModalOpen,
    
    modalTab,
    setModalTab,

    targetExercise,
    setTargetExercise,
    
    highLoadNotificationChecked,
    
    handleSelectExercise,
    handleSaveExerciseParams,
    
    openTrainingSaveModal,
    closeTrainingSaveModal,
    openAutoSelectModal,
    closeAutoSelectModal,

    
    handleEditModalClose: () => {
      setIsEditModalOpen(false);
      setHighLoadNotificationChecked(false);
    }
  };
};