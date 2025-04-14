import { Paper, Group, Text } from '@mantine/core';
import { IconLock, IconTrophy } from '@tabler/icons-react';
import { ACHIEVEMENT_DATA } from '@/shared/constants/userProgression';
import { LockedItem } from '../../types';

interface UnlockConditionProps {
  item: LockedItem | null;
}

export const UnlockCondition = ({ item }: UnlockConditionProps) => {
  if (item?.type === 'shop') return null;

  const getUnlockDescription = () => {
    switch (item?.type) {
      case 'level':
        return (
          <Group gap="xs" c="blue.5">
            <IconLock size={28} aria-label="уровень"/>
            <Text fw={500}>Достигните уровня {item.value} для разблокировки</Text>
          </Group>
        );
      case 'achievement':
        return (
          <Group gap="xs" c="orange.5">
            <IconTrophy size={28} aria-label="достижение" />
            <Text fw={500}>
              Разблокируйте достижение: {
                item.value ? ACHIEVEMENT_DATA[item.value].title : "#1"
              }
            </Text>
          </Group>
        );
      default:
        return <Text c="dimmed">Закрытый предмет</Text>;
    }
  };

  return (
    <Paper p="lg" radius="md" bg="dark.7">
      {getUnlockDescription()}
    </Paper>
  );
};
