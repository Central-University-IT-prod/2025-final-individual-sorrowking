import React from 'react';
import {SavedTrainings} from './modules';
import styles from './SavedTrainingsPage.module.scss';
import { useDefaultTrainings } from '@/shared/hooks/useDefaultTrainings';

const TrainingBuilder: React.FC = () => {
  useDefaultTrainings();  // ! хук для создания дефолт тренировок

  return (
    <div className={styles.savedTrainings}>

      <div className={styles.mainContent}>
        <SavedTrainings />
      </div>
    </div>
  );
};

export default TrainingBuilder;