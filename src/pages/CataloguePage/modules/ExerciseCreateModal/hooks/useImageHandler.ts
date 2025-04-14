import { useEffect, useState } from 'react';
import { getImage, generateRandomId } from '@/shared/utils/indexDB';
import { toast } from 'react-toastify';
import { Exercise } from '@/shared/types/types';

export const useImageHandler = (exerciseToEdit?: Exercise | null) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [exerciseId, setExerciseId] = useState<string | undefined>(undefined);

  const reset = () => {
    setPreview(null);
    setExerciseId(undefined)
  }

  const handleImageDrop = (files: FileList) => {
    if (files.length > 0) {
      setPreview(null);
      const file = files[files.length - 1];
      const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/svg+xml'];
      
      if (!allowedTypes.includes(file.type)) {
        toast.error('Неподдерживаемый формат файла. Пожалуйста, загрузите файл в формате JPG, PNG или SVG.');
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error('Файл слишком большой. Максимальный размер файла: 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        const key = `image_${generateRandomId()}`;
        setPreview(base64);
        setExerciseId(key);
        toast.success('Файл успешно загружен!');
      };

      reader.onerror = () => {
        toast.error('Не удалось загрузить файл. Пожалуйста, попробуйте снова.');
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (exerciseToEdit?.exerciseId) {
      getImage(exerciseToEdit.exerciseId).then((base64) => {
        if (base64) setPreview(base64);
      });
      setExerciseId(exerciseToEdit.exerciseId);
    }
  }, [exerciseToEdit]);

  return {
    preview,
    exerciseId,
    handleImageDrop,
    setPreview,
    setExerciseId,
    reset
  };
};