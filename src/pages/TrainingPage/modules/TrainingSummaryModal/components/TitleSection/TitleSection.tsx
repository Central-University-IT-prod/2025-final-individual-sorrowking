import { Group, Text } from '@mantine/core';
import { IconTrophy } from '@tabler/icons-react';

export const TitleSection = () => (
  <Group gap="sm">
    <IconTrophy size={28} color="var(--mantine-color-yellow-5)" aria-label="кубок"/>
    <Text fw={700} size="xl">Результаты тренировки</Text>
  </Group>
);