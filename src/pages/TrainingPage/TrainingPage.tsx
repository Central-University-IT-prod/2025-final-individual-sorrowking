import useTrainingStore from '@/shared/stores/trainingStore';
import CurrentExerciseCard from './modules/CurrentExerciseCard';
import RestTimer from './modules/RestTimer';
import { TrainingSummaryModal } from './modules';
import styles from './TrainingPage.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { Card, Progress } from '@mantine/core';
import useUserStore from '@/shared/stores/userStore';
import { SelectedExercise, Training } from '@/shared/types/types';
import { getTrainingDifficulty } from '@/shared/utils/trainingHelpers';
import { ACHIEVEMENT_DATA } from '@/shared/constants/userProgression';
import { toast } from 'react-toastify';

interface PreviousUserData {
  level: number,
  exp: number,
  coins: number
}
const TrainingPage = () => {
  const { runningTraining, deleteTraining, clearRunning } = useTrainingStore(); 
  const { user, addExperience, updateCoins, saveCompletedTraining } = useUserStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [startTime] = useState(new Date());
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [isTrainingFinished, setIsTrainingFinished] = useState(false);
  const [previousUserData, setPreviousUserData] = useState<PreviousUserData | null>(null);
  const [skippedExercisesIndices, setSkippedExercisesIndices] = useState<number[]>([]);
  const [completedExercises, setCompletedExercises] = useState<SelectedExercise[]>([]);

  // при анмаунте деселектаем тренировку + удаляем ее если выбрано одноразовое прохождение
  useEffect(() => {
    return () => {
      if (runningTraining?.oneshot) {
        deleteTraining(runningTraining.id);
      }
      
      clearRunning();
    };
  }, []);
  
  // поставил относительно большие значения, чтобы можно было легко отследить прогресс
  const calculateExperience = (training: Training) => {
    const difficulty = getTrainingDifficulty(training);
    const baseExp = training.exercises.length * 50;
    return Math.round(baseExp * difficulty);
  };

  const calculateCoins = (training: Training) => {
    return training.exercises.length * 10;
  };

  
  const handleExerciseComplete = useCallback(() => {
    if (isTrainingFinished || !runningTraining) return;
    const isLastExercise = currentIndex === runningTraining.exercises.length - 1;
  
    if (isLastExercise) {
      completeTraining();
    } else {
      setCurrentIndex(prev => prev + 1);
      setIsResting(true);
    }
  }, [isTrainingFinished, runningTraining, currentIndex]);

  const handleSkip = () => {
    if (isTrainingFinished || !runningTraining) return;
    
    setSkippedExercisesIndices(prev => [...prev, currentIndex]);
    const nextIndex = currentIndex + 1;
    if (nextIndex < runningTraining.exercises.length) {
      setCurrentIndex(nextIndex);
      setIsResting(true);
    } else {
      completeTraining();
    }

  };

  const completeTraining = () => {
    if (!runningTraining) return;
    
    const completedExercises = runningTraining.exercises.filter((_, index) => 
      !skippedExercisesIndices.includes(index)
    );
    const completedTraining = {
      ...runningTraining,
      exercises: completedExercises,
    };

    setCompletedExercises(completedExercises);

    setPreviousUserData({
      level: user.currentLevel,
      exp: user.currentExperience,
      coins: user.coins,
    });

    const expGained = calculateExperience(completedTraining);
    const coinsGained = calculateCoins(completedTraining);

    addExperience(expGained);
    updateCoins(coinsGained);

    const previousAchievements = user.unlockedAchievements;
  
    saveCompletedTraining(completedTraining);
  
    const currentUser = useUserStore.getState().user;
    const newAchievements = currentUser.unlockedAchievements.filter(
      id => !previousAchievements.includes(id)
    );


    newAchievements.forEach((achievementId) => {
      const achievement = ACHIEVEMENT_DATA[achievementId as keyof typeof ACHIEVEMENT_DATA];
      if (achievement) {
        toast(
          <div className={styles.achievementToast}>
            <div className={styles.toastHeader}>
              <h4>🏆 {achievement.title} 🏆</h4>
            </div>
            <p>{achievement.description}</p>
            <small>Открыто: {achievement.unlockedItemName}</small>
          </div>,
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            icon: false,
          }
        );
      }
    });

    setEndTime(new Date());
    setIsSummaryModalOpen(true);
    setIsTrainingFinished(true);
    setIsResting(false); 
  };

  const handleRestComplete = () => {
    if (isTrainingFinished) return;
    setIsResting(false);
  };


  const handleSummaryOpen = () => {
    setIsSummaryModalOpen(true);
  }

  if (!runningTraining) {
    return <div className={styles.trainingPage}>Для начала выберите тренировку из сохраненных или создайте новую!</div>;
  }

  const totalExercises = runningTraining.exercises.length;
  const progress = isTrainingFinished 
    ? 100 
    : (currentIndex / (totalExercises - 1)) * 100;

  return (
    <div className={styles.trainingPage}>
      <TrainingSummaryModal
        opened={isSummaryModalOpen}
        onClose={() => setIsSummaryModalOpen(false)}
        exercises={completedExercises}
        startTime={startTime}
        endTime={endTime}
        expGained={calculateExperience({ ...runningTraining, exercises: completedExercises })}
        previousUserData={previousUserData as PreviousUserData}
      />

      <Card shadow="sm" p="lg" radius="md" className={styles.card}>
        <Progress
          value={progress}
          size="lg"
          color="orange"
          mb="xl"
          animated
          classNames={{ root: styles.progress }}
          aria-label="Прогресс тренировки"
        />
        
        {
          isResting ? (
            <RestTimer
              initialSeconds={60}
              onComplete={handleRestComplete}
              onSkip={handleRestComplete}
            />
          ) : (
            <CurrentExerciseCard
              exercise={runningTraining.exercises[currentIndex]}
              onComplete={isTrainingFinished ? handleSummaryOpen : handleExerciseComplete}
              onSkip={isTrainingFinished ? handleSummaryOpen : handleSkip}
              isLastExercise={currentIndex == runningTraining.exercises.length - 1}
              disabled={isTrainingFinished}
            />
          )
        }

      </Card>
    </div>
  );
};

export default TrainingPage;