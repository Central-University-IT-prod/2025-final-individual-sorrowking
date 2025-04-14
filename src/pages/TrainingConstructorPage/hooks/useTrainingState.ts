import { useState, useEffect } from 'react';
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import useTrainingStore from '@/shared/stores/trainingStore';
import { SelectedExercise, Training } from '@/shared/types/types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export const useTrainingState = () => {
  const {
    selectedExercises: savedSelectedExercises,
    reorderSelectedExercises,
    deleteSelectedExercise,
    addTraining,
    updateTraining,
    getTrainingBySelectedExerciseId,
    clearEditing,
    editingTrainingId,
    editingTraining,
    selectRunnningTraining
  } = useTrainingStore();
  
  const navigate = useNavigate();
  const [selectedExercises, setSelectedExercises] = useState(savedSelectedExercises);
  const [trainingTitle, setTrainingTitle] = useState('');
  const [trainingDescription, setTrainingDescription] = useState('');
  const [mode, setMode] = useState<'delete' | 'arrange' | 'edit'>('arrange');
  const [activeExercise, setActiveExercise] = useState<SelectedExercise | null>(null);

  useEffect(() => {
    setSelectedExercises(savedSelectedExercises);
  }, [savedSelectedExercises]);

  useEffect(() => {
    if (editingTraining) {
      setTrainingTitle(editingTraining.title);
      setSelectedExercises(editingTraining.exercises);
    }

    const handleUnload = () => {
      if (editingTraining) {
        clearEditing();
      }
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      if (editingTraining) {
        clearEditing();
      }
    };
  }, [editingTraining, clearEditing]);

  const handleDragStart = (event: DragStartEvent) => {
    const foundExercise = selectedExercises.find(ex => ex.uuid === event.active.id);
    setActiveExercise(foundExercise || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setSelectedExercises(items => {
        const oldIndex = items.findIndex(item => item.uuid === active.id);
        const newIndex = items.findIndex(item => item.uuid === over?.id);
        const reordered = arrayMove(items, oldIndex, newIndex);
        reorderSelectedExercises(reordered);
        return reordered;
      });
    }
    setActiveExercise(null);
  };

  const handleSaveTraining = (options?: { description?: string; oneshot?: boolean }) => {
    if (!trainingTitle.trim()) {
      toast.error('Пожалуйста, введите название тренировки');
      return;
    }

    const trainingData = {
      title: trainingTitle,
      description: options?.description || trainingDescription,
      exercises: selectedExercises,
      oneshot: options?.oneshot
    };

    if (editingTrainingId) {
      updateTraining(editingTrainingId, trainingData);
      if (!options?.oneshot) toast.success('Тренировка успешно обновлена!');
    } else {
      addTraining(trainingData);
      if (!options?.oneshot) toast.success('Тренировка успешно добавлена!');
    }
  

    if (options?.oneshot) {
      // небольшой костыль, но рабочий, так как у каждого упражнения в тренировке уникальный id
      selectRunnningTraining(getTrainingBySelectedExerciseId(trainingData.exercises[0].uuid) as Training);
      navigate('/training');
    }

    setTrainingTitle('');
    setTrainingDescription('');
    clearEditing();
    setSelectedExercises([]);
  };

  return {
    selectedExercises,
    trainingTitle,
    setTrainingTitle,
    trainingDescription,
    setTrainingDescription,
    mode,
    setMode,
    activeExercise,
    handleDragStart,
    handleDragEnd,
    handleRemoveExercise: (uuid: string) => {
      setSelectedExercises(prev => prev.filter(ex => ex.uuid !== uuid));
      deleteSelectedExercise(uuid);
    },
    handleSaveTraining,
    editingTrainingId 
  };
};