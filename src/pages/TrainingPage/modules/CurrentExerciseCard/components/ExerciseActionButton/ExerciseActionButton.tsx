import { Button, Group } from '@mantine/core';
import { IconArrowRight, IconCheckbox } from '@tabler/icons-react';
import styles from './ExerciseActionButton.module.scss'

interface ExerciseActionButtonProps {
  disabled: boolean;
  isSkip: boolean;
  isLastExercise: boolean,
  isSmallScreen: boolean | undefined;
  onClick: () => void;
}

export const ExerciseActionButton = ({ disabled, isSkip, isSmallScreen, isLastExercise, onClick }: ExerciseActionButtonProps) => (
  <Group justify="center">
    <Button
      size={isSmallScreen ? "sm" : "md"}
      radius="xl"
      color="orange"
      variant="gradient"
      gradient={{ from: 'orange', to: 'red' }}
      rightSection={isSkip ? <IconArrowRight size={22} /> : <IconCheckbox size={22} />}
      onClick={onClick}
      className={styles.skipButton}
    >
      {disabled ? 'Посмотреть результаты' 
      : isLastExercise ? 'Завершить тренировку' 
      : (isSkip ? 'Пропустить упражнение' : 'Завершить упражнение')}
    </Button>
  </Group>
);