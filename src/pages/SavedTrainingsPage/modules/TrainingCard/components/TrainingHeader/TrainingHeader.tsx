import { Group, Text, Stack, Badge, ActionIcon, Divider, Flex } from '@mantine/core';
import { IconClock, IconRepeat, IconChevronDown } from '@tabler/icons-react';
import { Training } from '@/shared/types/types';
import { getTrainingDifficulty, getTrainingDuration } from '@/shared/utils/trainingHelpers';
import { DIFFICULTY_GRADIENTS } from '@/shared/constants/difficulty';
import styles from './TrainingHeader.module.scss';

const getDifficultyProps = (score: number) => {
  if (score <= 1.5) {
    return { label: 'Легкая', gradient: DIFFICULTY_GRADIENTS['easy'] };
  } else if (score <= 2.5) {
    return { label: 'Средняя', gradient: DIFFICULTY_GRADIENTS['medium'] };
  } else {
    return { label: 'Тяжелая', gradient: DIFFICULTY_GRADIENTS['hard'] };
  }
};
export const TrainingHeader = ({ 
  training, 
  opened, 
  onToggle 
}: { 
  training: Training;
  opened: boolean;
  onToggle: () => void;
}) => {
  const difficultyScore = getTrainingDifficulty(training);
  const durationInMinutes = getTrainingDuration(training);
  const { label, gradient } = getDifficultyProps(difficultyScore);

  return (
    <Stack gap="sm" onClick={onToggle}>
      <Group justify="space-between" wrap="nowrap">
        <Group gap="md">
          <Flex direction="column" gap="10px">
            <Text fw={600} size="xl" c="dark">{training.title}</Text>
            <Badge gradient={gradient} variant="gradient" size="lg">
              {label}
            </Badge>
          </Flex>

        </Group>
        <ActionIcon variant="transparent" color="gray">
          <IconChevronDown 
            aria-label="раскрыть тренировку"
            className={`${styles.icon} ${opened ? styles.icon_rotated : ''}`} 
          />
        </ActionIcon>
      </Group>

      <Group gap="xl">
        <Group gap="xs" c="blue">
          <IconClock size={20} />
          <Text size="sm">~{durationInMinutes} минут</Text>
        </Group>
        <Group gap="xs" c="green">
          <IconRepeat size={20} />
          <Text size="sm">{training.exercises.length} упражнений</Text>
        </Group>
      </Group>

      <Divider color="blue" size="sm" />
    </Stack>
  );
};
