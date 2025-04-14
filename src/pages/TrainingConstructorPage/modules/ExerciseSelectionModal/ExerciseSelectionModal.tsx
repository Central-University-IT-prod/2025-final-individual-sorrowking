import React from 'react';
import { Modal, Tabs, Grid } from '@mantine/core';
import styles from './ExerciseSelectionModal.module.scss';
import { Exercise } from '@/shared/types/types';
import { ExerciseCardTraining } from '../../components';

interface ExerciseSelectionModalProps {
  opened: boolean;
  onClose: () => void;
  exercises: Exercise[];
  likedExercises: Exercise[];
  modalTab: 'all' | 'liked';
  setModalTab: (tab: 'all' | 'liked') => void;
  handleSelectExercise: (exercise: Exercise) => void;
}

const ExerciseSelectionModal: React.FC<ExerciseSelectionModalProps> = ({
  opened,
  onClose,
  exercises,
  likedExercises,
  modalTab,
  setModalTab,
  handleSelectExercise,
}) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="xl"
      classNames={{
        content: styles.modalContent,
      }}
      closeButtonProps={{
        'aria-label': 'закрыть окно выбора упражнения'
      }}
    >
      <Tabs 
        value={modalTab} 
        onChange={(value) => setModalTab(value as 'all' | 'liked')}
        classNames={{
          list: styles.tabsList,
        }}
      >
        <Tabs.List>
          <Tabs.Tab value="all">
            Все упражнения
          </Tabs.Tab>
          <Tabs.Tab value="liked">
            Избранные
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <Grid>
        {(modalTab === 'all' ? exercises : likedExercises).map((exercise) => (
          <Grid.Col key={exercise.exerciseId} span={{ base: 12, xs: 6, md: 4}}>
            <div
              className={styles.exerciseItem}
              onClick={() => {
                handleSelectExercise(exercise);
                onClose();
              }}
            >
              <ExerciseCardTraining {...exercise} />
            </div>
          </Grid.Col>
        ))}
      </Grid>
    </Modal>
  );
};

export default ExerciseSelectionModal;