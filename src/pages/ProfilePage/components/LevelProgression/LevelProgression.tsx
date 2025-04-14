import { Paper, Flex, Text, Grid, Image } from '@mantine/core';
import { IconBadge, IconCoin } from '@tabler/icons-react';
import useUserStore from '@/shared/stores/userStore';
import styles from './LevelProgression.module.scss';
import { LEVEL_UNLOCKS } from '@/shared/constants/userProgression';

const LevelProgression = () => {
  const currentLevel = useUserStore((state) => state.user.currentLevel)

  const levels = Object.keys(LEVEL_UNLOCKS)
    .map(Number)
    .sort((a, b) => a - b)
    .map((level) => ({
      level,
      isUnlocked: currentLevel >= level,
      rewards: (() => {
        const rewards = [];
        const levelData = LEVEL_UNLOCKS[level];
        
        if (levelData.coins) {
          rewards.push({ type: 'coins', value: levelData.coins });
        }
        if (levelData.item) {
          rewards.push({ type: 'item', value: levelData.item });
        }
        if (levelData.status) {
          rewards.push({ type: 'status', value: levelData.status });
        }
        return rewards;
      })()
    }));

  return (
    <div className={styles.levelProgression}>
      <Flex gap="xl" className={styles.levelProgression__container} tabIndex={0}>
        {levels.map((levelData, index) => (
          <div key={levelData.level} className={styles.levelProgression__wrapper}>
            <Paper
              withBorder
              p="md"
              className={`${styles.levelCard} ${levelData.isUnlocked ? styles.unlocked : ''}`}
            >
              <Flex gap="xs" align="center" mb="sm">
                <div className={styles.levelCard__levelNumber}>{levelData.level}</div>
                <Text fz="sm">Уровень</Text>
              </Flex>

              <Grid gutter="xs">
                {levelData.rewards.map((reward, i) => (
                  <Grid.Col span={6} key={i}>
                    <Paper p="xs" className={styles.rewardCard}>
                      {reward.type === 'coins' ? (
                        <Flex align="center" direction="column" gap="xs">
                          <IconCoin 
                            size={24}
                            color="var(--mantine-color-yellow-6)"
                            strokeWidth={1.5}
                            aria-label="монеты"
                          />
                          <Text fw={700} size='sm'>+{reward.value}</Text>
                        </Flex>
                      ) : reward.type === 'status' ? (
                        <Flex align="center" direction="column" gap="xs">
                          <IconBadge 
                            size={24}
                            color="var(--mantine-color-blue-6)"
                            strokeWidth={1.5}
                            aria-label="статус"
                          />
                          <Text fw={700} size="sm">Статус</Text>
                        </Flex>
                      ) : (
                        <Flex direction="column" align="center" gap={4}>
                          <Image 
                            src={`/assets/glbPreviews/${reward.value}.png`}
                            width={60}
                            height={60}
                            alt="Item preview"
                            style={{
                              borderRadius: 8,
                              overflow: 'hidden'
                            }}
                          />
                        </Flex>
                      )}
                    </Paper>
                  </Grid.Col>
                ))}
              </Grid>
            </Paper>

            {index < levels.length - 1 && (
              <div className={styles.connectorLine}></div>
            )}
          </div>
        ))}
      </Flex>
    </div>
  );
};

export default LevelProgression;