import React, { useState } from 'react';
import useTrainingStore from '@/shared/stores/trainingStore';
import styles from './SavedTrainings.module.scss';
import TrainingCard from '../TrainingCard';
import { Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
const SavedTrainings: React.FC = () => {
  const { trainings } = useTrainingStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTrainings = trainings.filter(training =>
    training.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className={styles.savedTrainings}>
      <div className={styles.savedTrainings__wrapper}>
        <Input
          size="lg"
          radius="md"
          placeholder="Найти тренировку..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          leftSection={<IconSearch size={20} />}
          classNames={{
            input: styles.searchInput,
          }}
          mb="xl"
        />

        <div className={styles.savedTrainings__grid}>
          {filteredTrainings.map((training) => (
            <TrainingCard key={training.id} training={training} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedTrainings;