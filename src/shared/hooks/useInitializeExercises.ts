import { useEffect, useState } from "react";
import useExerciseStore from "@/shared/stores/exerciseStore";
import { exercises } from "../constants/exercises";
import { generateFileName, storeImage } from '@/shared/utils/indexDB';

export const useInitializeExercises = () => {
  const { exercises: storeExercises, addExercises } = useExerciseStore();
  const [loading, setLoading] = useState(true);
  useEffect(() => {

    const initializeExercises = async () => {

      if (storeExercises.length === 0) {
        const updatedExercises = await Promise.all(
          exercises.map(async (exercise) => {
            const response = await fetch(exercise.exerciseId);
            const blob = await response.blob();
            const file = new File([blob], exercise.exerciseId.split('/').pop()!);
            const fileName = generateFileName(file);

            const reader = new FileReader();
            const base64 = await new Promise<string>((resolve, reject) => {
              reader.onloadend = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            });
            await storeImage(fileName, base64);

            return { ...exercise, exerciseId: fileName };
          })
        );
        addExercises(updatedExercises);
      }
      setLoading(false);
    };

    initializeExercises();
  }, [storeExercises, addExercises]);

  return loading;
};