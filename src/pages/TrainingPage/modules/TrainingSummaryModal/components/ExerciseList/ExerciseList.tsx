import { Flex, Group, Text, ThemeIcon } from '@mantine/core';
import { SelectedExercise } from '@/shared/types/types';
import { targetResultConfig } from '../../constants';

interface ExerciseListProps {
  exercises: SelectedExercise[];
}

export const ExerciseList = ({ exercises }: ExerciseListProps) => (
  <Flex direction="column" gap="sm">
    {exercises.map((exercise) => (
      <ExerciseItem key={exercise.uuid} exercise={exercise} />
    ))}
  </Flex>
);

const ExerciseItem = ({ exercise }: { exercise: SelectedExercise }) => (
  <Group justify="space-between" p="sm" bg="var(--mantine-color-gray-0)" wrap="nowrap">
    <Text lineClamp={1}>{exercise.exercise.title}</Text>
    <Group gap="md" wrap="nowrap">
      {exercise.exercise.targetResult.map((result) => {
        const { icon: Icon, color, format } = targetResultConfig[result];
        const value = exercise.targetValues[result];
        return (
          <Group gap={4} key={result}>
            <ThemeIcon variant="light" color={color} size="sm">
              <Icon size={16} />
            </ThemeIcon>
            <Text size="sm" fw={500}>{format(value)}</Text>
          </Group>
        );
      })}
    </Group>
  </Group>
);