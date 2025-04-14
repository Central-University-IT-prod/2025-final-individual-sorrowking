import { Paper, Progress, Group, Text, Avatar } from '@mantine/core';
import { Achievement } from '@/shared/types/types';
import styles from './AchievementCard.module.scss';
import useUserStore from '@/shared/stores/userStore';

interface AchievementCardProps {
  achievementId: number;
  achievement: Achievement;
}

const AchievementCard = ({ achievementId, achievement }: AchievementCardProps) => {
  const {getAchievementProgress} = useUserStore();
  const { progress, max} = getAchievementProgress(achievementId);
  return (
    <Paper
    withBorder
    p="md"
    radius="md"
    className={`${styles.achievement} ${progress === max ? styles["achievement--completed"]: ''}`}
    
  >
    <Group justify="space-between">
      <Group gap="sm">
        <Avatar
          size={46}
          src={`/assets/glbPreviews/${achievement.unlockedItem}.png`}
          color={'blue'}
          variant={'filled'}
          alt={achievement.title}
        >
          {!achievement.unlockedItem && achievement.title[0]}
        </Avatar>
        <div>
          <Text fw={600}>{achievement.title}</Text>
          <Text fz="sm">{achievement.description}</Text>
        </div>
      </Group>
      
      <Text fw={700} c={progress === max ? 'teal' : 'blue'}>
        {progress}/{max}
      </Text>
    </Group>

    {max > 1 && (
      <Progress
        value={(progress / max) * 100}
        color="blue"
        mt="sm"
        size="lg"
        radius="xl"
        aria-label={`Прогресс выполнения ${achievement.title}`}
      />
    )}
  </Paper>
  )

};

export default AchievementCard;