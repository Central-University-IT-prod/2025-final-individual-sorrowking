import { Modal, Flex, Divider, Group, Text } from '@mantine/core';
import { IconListCheck } from '@tabler/icons-react';
import useUserStore from '@/shared/stores/userStore';
import { SelectedExercise } from '@/shared/types/types';
import { ExerciseList, LevelProgressCard, LevelRewards, RewardSummary, TitleSection, WorkoutInfo } from './components';
import { MAX_LEVEL, USER_LEVEL_EXPERIENCE } from '@/shared/constants/userProgression';

interface TrainingSummaryModalProps {
  opened: boolean;
  onClose: () => void;
  exercises: SelectedExercise[];
  startTime: Date;
  endTime: Date | null;
  expGained: number;
  previousUserData?: {
    level: number;
    exp: number;
    coins: number;
  };
}

const TrainingSummaryModal = ({ 
  opened, 
  onClose, 
  exercises, 
  startTime,
  endTime,
  expGained,
  previousUserData
}: TrainingSummaryModalProps) => {
  const { user } = useUserStore();
  const currentLevel = user.currentLevel;
  const currentExp = user.currentExperience;
  const currentCoins = user.coins;
  const nextLevel = currentLevel < MAX_LEVEL ? currentLevel + 1 : MAX_LEVEL;
  const nextLevelExp = USER_LEVEL_EXPERIENCE[nextLevel] || currentExp;
  const hasLevelUp = previousUserData?.level !== undefined && currentLevel > previousUserData.level;
  const totalDuration = endTime ? Math.floor((endTime.getTime() - startTime.getTime()) / 1000) : 0;
  const coinsEarned = previousUserData ? currentCoins - previousUserData.coins : 0;
  const progress = (currentExp / nextLevelExp) * 100;
  const newExpDelta = currentExp - (previousUserData?.exp || 0);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<TitleSection />}
      size="lg"
      radius="md"
      padding="xl"
      overlayProps={{ blur: 3 }}
      closeButtonProps={{
        'aria-label': 'закрыть окно статистики'
      }}
    >
      <Flex direction="column" gap="lg">
        <WorkoutInfo 
          startTime={startTime} 
          endTime={endTime} 
          totalDuration={totalDuration} 
        />

        <Divider 
          label={
            <Group gap="xs">
              <IconListCheck size={18} aria-label="выполненное"/>
              <Text fw={600} c='dark'>Выполненные упражнения</Text>
            </Group>
          } 
          labelPosition="left"
        />

        <ExerciseList exercises={exercises} />

        <RewardSummary
          coinsEarned={coinsEarned}
          expGained={expGained}
          previousUserData={previousUserData}
          currentCoins={currentCoins}
        />

        <LevelProgressCard
          currentLevel={currentLevel}
          currentExp={currentExp}
          nextLevelExp={nextLevelExp}
          hasLevelUp={hasLevelUp}
          previousUserData={previousUserData}
          newExpDelta={newExpDelta}
          progress={progress}
        />

        {hasLevelUp && previousUserData && (
          <LevelRewards 
            currentLevel={currentLevel}
            previousLevel={previousUserData.level}
          />
        )}
      </Flex>
    </Modal>
  );
};

export default TrainingSummaryModal