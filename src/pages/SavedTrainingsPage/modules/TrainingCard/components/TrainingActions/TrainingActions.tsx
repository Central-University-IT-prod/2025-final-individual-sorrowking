import { Group, ActionIcon } from '@mantine/core';
import { IconPlayerPlay, IconEdit, IconTrash } from '@tabler/icons-react';
import { Training } from '@/shared/types/types';
import useTrainingStore from '@/shared/stores/trainingStore';
import styles from './TrainingActions.module.scss';

export const TrainingActions = ({ 
  training, 
  navigate,
  onToggle 
}: { 
  training: Training;
  navigate: (path: string) => void;
  onToggle: () => void;
}) => {
  const handleStartTraining = (e: React.MouseEvent) => {
    e.stopPropagation();
    useTrainingStore.getState().selectRunnningTraining(training);
    navigate('/training');
  };

  const handleEditTraining = (e: React.MouseEvent) => {
    e.stopPropagation();
    useTrainingStore.getState().startEditingTraining(training);
    navigate('/training-constructor');
  };

  const handleDeleteTraining = (e: React.MouseEvent) => {
    e.stopPropagation();
    useTrainingStore.getState().deleteTraining(training.id);
    onToggle();
  };

  return (
    <Group justify="center" mt="md" gap="xs">
      <ActionIcon
        variant="filled"
        color="blue"
        size="lg"
        radius="md"
        onClick={handleStartTraining}
        className={styles.actionButton}
        aria-label="начать тренировку"
      >
        <IconPlayerPlay size={20} />
      </ActionIcon>
      <ActionIcon
        variant="filled"
        color="orange"
        size="lg"
        radius="md"
        onClick={handleEditTraining}
        className={styles.actionButton}
        aria-label="редактировать тренировку"

      >
        <IconEdit size={20} />
      </ActionIcon>
      <ActionIcon
        variant="filled"
        color="red"
        size="lg"
        radius="md"
        onClick={handleDeleteTraining}
        className={styles.actionButton}
        aria-label="удалить тренировку"

      >
        <IconTrash size={20} />
      </ActionIcon>
    </Group>
  );
};
