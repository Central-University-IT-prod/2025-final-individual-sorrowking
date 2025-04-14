import { Flex, Progress, Text, Paper, Group } from '@mantine/core';
import styles from './LevelProgressCard.module.scss'
import { MAX_LEVEL } from '@/shared/constants/userProgression';

interface LevelProgressCardProps {
  currentLevel: number;
  currentExp: number;
  nextLevelExp: number;
  hasLevelUp: boolean;
  previousUserData?: {
    exp: number;
  };
  newExpDelta: number;
  progress: number;
}

export const LevelProgressCard = ({
  currentLevel,
  currentExp,
  nextLevelExp,
  hasLevelUp,
  previousUserData,
  newExpDelta,
  progress
}: LevelProgressCardProps) => (
  <Paper p="lg" className={styles.levelCard}>
    <Flex gap="md" align="center">
      <div className={`${styles.levelCircle} ${hasLevelUp ? styles["levelCircle--new"] : styles["levelCircle--old"]}`}>
        <Text size="xl" fw={900}>
          {currentLevel === MAX_LEVEL ? 'MAX' : currentLevel}
        </Text>
      </div>
      <div style={{ flex: 1 }}>
        <Group justify="space-between" mb={8}>
          <Text fz="sm" c="dimmed">Прогресс уровня</Text>
          <Text fz="sm" fw={500}>{currentExp}/{nextLevelExp}</Text>
        </Group>
        {!hasLevelUp && previousUserData ? (
          <Progress.Root size="lg" radius="xl">
            <Progress.Section value={(previousUserData.exp / nextLevelExp) * 100} color="blue" aria-label='прогресс уровня'/>
            {currentLevel !== MAX_LEVEL && (
              <Progress.Section value={(newExpDelta / nextLevelExp) * 100} color="green" aria-label='прогресс уровня'>
              </Progress.Section>
            )}
          </Progress.Root>
        ) : (
          <Progress value={progress} color="green" size="lg" radius="xl" aria-label='прогресс уровня'/>
        )}
      </div>
    </Flex>
  </Paper>
);