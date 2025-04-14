import { Card, Box, Collapse } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { Training } from '@/shared/types/types';
import { TrainingHeader, TrainingActions, TrainingDetails, TrainingExerciseList } from './components';
import styles from './TrainingCard.module.scss';

const TrainingCard = ({ training }: { training: Training }) => {
  const [opened, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();

  return (
    <Card
      withBorder
      radius="lg"
      className={`${styles.trainingCard} ${opened ? styles.trainingCard__expanded : ''}`}
    >
      <Box className={styles.trainingCard__content}>
        <TrainingHeader 
          training={training} 
          opened={opened} 
          onToggle={toggle} 
        />
        <TrainingActions 
          training={training}
          navigate={navigate}
          onToggle={toggle}
        />
      </Box>

      <Collapse in={opened}>
        <TrainingDetails description={training.description} />
        <TrainingExerciseList exercises={training.exercises} />
      </Collapse>
    </Card>
  );
};

export default TrainingCard;