import { Progress, Group, Text, Paper, Flex, Grid } from '@mantine/core';
import {IconClock, IconCalendar, IconTreadmill, IconFlame, IconApple, IconLemon2, IconPepper } from '@tabler/icons-react';
import { LevelProgression } from '../../components';
import styles from './Statistics.module.scss';
import useUserStore from '@/shared/stores/userStore';
import { MAX_LEVEL } from '@/shared/constants/userProgression';
import { USER_LEVEL_EXPERIENCE } from '@/shared/constants/userProgression';

const Statistics = () => {
  const {user} = useUserStore();
  const currentLevel = user.currentLevel;
  const currentExperience = user.currentExperience;
  const nextLevelExp = user.currentLevel === MAX_LEVEL ? USER_LEVEL_EXPERIENCE[MAX_LEVEL] : USER_LEVEL_EXPERIENCE[user.currentLevel + 1];
  const progress = Math.round((currentExperience / nextLevelExp) * 100);

  const stats = [
    { 
      icon: <IconTreadmill size="1.6rem" aria-label="Тренировки"/>, 
      label: 'Общее число тренировок', 
      value: user.statistics.totalTrainings 
    },
    { 
      icon: <IconClock size="1.6rem" aria-label="Часы"/>, 
      label: 'Часов тренировок', 
      value: Math.round(user.statistics.totalDuration / 60) 
    },
    { 
      icon: <IconCalendar size="1.6rem" aria-label="Календарь"/>, 
      label: 'Упражнений выполнено', 
      value: user.statistics.totalExercises 
    },
    { 
      icon: <IconFlame size="1.6rem" aria-label="Огонь"/>, 
      label: 'Сожжено калорий', 
      value: user.statistics.totalCalories.toLocaleString() 
    },
    {
      icon: <IconApple size="1.6rem" aria-label="Яблоко"/>, 
      label: 'Лёгких тренировок', 
      value: user.statistics.trainingsByDifficulty.easy 
    },
    {
      icon: <IconLemon2 size="1.6rem" aria-label="Лимон"/>, 
      label: 'Средних тренировок', 
      value: user.statistics.trainingsByDifficulty.medium 
    },
    { 
      icon: <IconPepper size="1.6rem" aria-label="Перец"/>, 
      label: 'Сложных тренировок', 
      value: user.statistics.trainingsByDifficulty.hard 
    },
  ];

  return (
    <div className={styles.statistics}>
      <Paper p="lg" className={styles.levelCard}>
        <Flex gap="md" align="center">
          <div className={styles.levelCard__levelCircle}>
            <Text size="xl" fw={900}>
              {currentLevel === MAX_LEVEL ? "MAX" : currentLevel}
            </Text>
          </div>

          <div style={{ flex: 1 }}>
            <Group justify="space-between" mb={8}>
              <Text fz="sm" c="dimmed">
                Прогресс уровня
              </Text>
              <Text fz="sm" fw={500}>
                {currentExperience}/{nextLevelExp}
              </Text>
            </Group>

            <Progress
              value={progress}
              color="blue"
              size="lg"
              radius="xl"
              animated
              aria-label="Прогресс уровня"
            />


          </div>
        </Flex>

        <LevelProgression />

      </Paper>

      <Grid gutter="md" mt="lg">
        {stats.map((stat, index) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={index}>
            <Paper withBorder p="md" radius="md" h="100%">
              <Group>
                {stat.icon && <div className={styles.levelCard__iconWrapper}>{stat.icon}</div>}
                <div>
                  <Text fz="sm">
                    {stat.label}
                  </Text>
                  <Text fz="xl" fw={700}>
                    {stat.value}
                  </Text>
                </div>
              </Group>
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default Statistics;