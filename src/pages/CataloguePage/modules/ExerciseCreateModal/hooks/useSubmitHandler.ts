import useExerciseStore from '@/shared/stores/exerciseStore';
import { storeImage, deleteImage, generateRandomId} from '@/shared/utils/indexDB';
import { toast } from 'react-toastify';
import { Exercise, TargetResult } from '@/shared/types/types';
import { LOGO_MOBILE_PATH } from '@/shared/constants/logoPaths';


interface ExerciseState {
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  text: string;
  targetResult: TargetResult[];
  averageValues: Partial<Record<TargetResult, number>>;
}

interface ImageState {
  preview: string | null;
  exerciseId: string | undefined;
  setPreview: React.Dispatch<React.SetStateAction<string | null>>;
  setExerciseId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

interface SelectState {
  equipment: string[];
  tags: string[];
}


export const useSubmitHandler = (
  handleClose: () => void,
  exerciseState: ExerciseState,
  imageState: ImageState,
  selectState: SelectState,
  exerciseToEdit?: Exercise | null
) => {
  const addExercise = useExerciseStore((state) => state.addExercise);
  const updateExercise = useExerciseStore((state) => state.updateExercise);

  const getDefaultImage = async (): Promise<string> => {
    try {
      const response = await fetch(LOGO_MOBILE_PATH);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      toast.error('Failed to load default image');
      throw error;
    }
  };

  const handleSubmit = async () => {
    const { title, description, difficulty, text, targetResult, averageValues } = exerciseState;
    const { equipment, tags } = selectState;
    const { preview, exerciseId } = imageState;

    if (!title || !description || !difficulty || !text) {
      toast.error('Пожалуйста, заполните все обязательные поля.');
      return;
    }

    if (equipment.length === 0 || tags.length === 0) {
      toast.error('Пожалуйста, добавьте оборудование и теги.');
      return;
    }

    if (targetResult.length === 0) {
      toast.error('Должен быть выбран хотя бы один целевой параметр');
      return;
    }

    const averageValuesSubmit = Object.fromEntries(
      Object.entries(averageValues).filter(([key]) => targetResult.includes(key as keyof typeof averageValues))
    );

    if (Object.keys(averageValuesSubmit).length !== targetResult.length ||
        Object.values(averageValuesSubmit).some(value => value === 0)) {
      toast.error('Выберите стандартные значения');
      return;
    }

    const finalExerciseId = exerciseId || `image_${generateRandomId()}`;
    let finalPreview = preview;

    if (!finalPreview) {
      finalPreview = await getDefaultImage();
    }

    try {
      await storeImage(finalExerciseId, finalPreview!);
    } catch (error) {
      toast.error('Не удалось сохранить изображение');
      return;
    }

    
    const updatedExercise: Exercise = {
      title,
      description,
      difficulty,
      equipment,
      tags,
      text,
      exerciseId: finalExerciseId,
      targetResult,
      averageValues: averageValuesSubmit,
    };

    if (exerciseToEdit) {
      if (exerciseToEdit.exerciseId !== exerciseId) {
        await deleteImage(exerciseToEdit.exerciseId as string);
      }
      updateExercise(exerciseToEdit.exerciseId as string, updatedExercise);
      toast.success('Упражнение успешно изменено!');
    } else {
      addExercise(updatedExercise);
      toast.success('Упражнение успешно добавлено!');
    }
    handleClose();
  };

  return { handleSubmit };
};