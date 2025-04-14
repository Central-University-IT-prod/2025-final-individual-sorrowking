import { Flex, Paper, Text, ThemeIcon, Image, Box } from '@mantine/core';
import { IconCoin, IconBadge } from '@tabler/icons-react';
import { LEVEL_UNLOCKS } from '@/shared/constants/userProgression';
import styles from './LevelRewards.module.scss'

interface LevelRewardsProps {
  currentLevel: number;
  previousLevel: number;
}

export const LevelRewards = ({ currentLevel, previousLevel }: LevelRewardsProps) => {
  const levelsGained = Array.from(
    { length: currentLevel - previousLevel }, 
    (_, i) => previousLevel + i + 1
  );

  return (
    <Box mt="md">
      <Text fw={600} mb="sm">Награды за новые уровни:</Text>
      <Flex gap="md" className={styles.levelRewardsList}>
        {levelsGained.map((level) => {
          const reward = LEVEL_UNLOCKS[level];
          return (
            <Paper key={level} p="xs" className={styles.levelRewardsList__rewardCard}>
              <Flex direction="column" align="center" gap="xs">
                <div className={styles.levelRewardsList__levelBadge}>
                  <Text size="sm" fw={700}>Уровень {level}</Text>
                </div>
                <Flex gap="sm" align="center">
                  {reward.coins && (
                    <Flex align="center" gap={4}>
                      <IconCoin size={20} color="var(--mantine-color-yellow-5)" aria-label="монета"/>
                      <Text fw={600}>{reward.coins}</Text>
                    </Flex>
                  )}
                  {reward.item && (
                    <Image
                      src={`/assets/glbPreviews/${reward.item}.png`}
                      alt="Item"
                      className={styles.levelRewardsList__itemImage}
                    />
                  )}
                  {reward.status && (
                    <ThemeIcon variant="light" color="blue" size="lg" radius="xl">
                      <IconBadge size={18} aria-label="статус"/>
                    </ThemeIcon>
                  )}
                </Flex>
              </Flex>
            </Paper>
          );
        })}
      </Flex>
    </Box>
  );
};