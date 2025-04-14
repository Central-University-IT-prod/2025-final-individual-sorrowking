import { useState, useEffect } from 'react';
import { Exercise, TargetResult } from '@/shared/types/types';

export const useExerciseFormState = (exerciseToEdit?: Exercise | null) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [text, setText] = useState('');
  const [targetResult, setTargetResult] = useState<TargetResult[]>([]);
  const [averageValues, setAverageValues] = useState<Partial<Record<TargetResult, number>>>({});

  const reset = () => {
    setTitle('')
    setDescription('')
    setDifficulty('easy')
    setText('')
    setTargetResult([])
    setAverageValues({})
  }
  useEffect(() => {
    if (exerciseToEdit) {
      setTitle(exerciseToEdit.title);
      setDescription(exerciseToEdit.description);
      setDifficulty(exerciseToEdit.difficulty);
      setText(exerciseToEdit.text);
      setTargetResult(exerciseToEdit.targetResult);
      if (exerciseToEdit.averageValues) setAverageValues(exerciseToEdit.averageValues);
    }
  }, [exerciseToEdit]);

  return {
    reset,
    title,
    setTitle,
    description,
    setDescription,
    difficulty,
    setDifficulty,
    text,
    setText,
    targetResult,
    setTargetResult,
    averageValues,
    setAverageValues
  };
};