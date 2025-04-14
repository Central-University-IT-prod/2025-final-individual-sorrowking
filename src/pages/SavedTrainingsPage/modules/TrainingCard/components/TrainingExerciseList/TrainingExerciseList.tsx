import { Stack, Group, Text } from '@mantine/core';
import { SelectedExercise } from '@/shared/types/types';
import styles from './TrainingExerciseList.module.scss';

export const TrainingExerciseList = ({ 
  exercises 
}: { 
  exercises: SelectedExercise[] 
}) => {
  return (
    <Stack gap="sm">
      {exercises.map((selectedExercise) => (
        <Group
          key={selectedExercise.uuid}
          className={styles.exercise}
          gap="xs"
          px="md"
          py="sm"
        >
          <Text size="sm">{selectedExercise.exercise.title}</Text>
        </Group>
      ))}
    </Stack>
  );
};
