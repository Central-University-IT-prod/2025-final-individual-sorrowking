import { Box, Flex, Group, Text, ThemeIcon } from '@mantine/core';
import { IconAward, IconCalendar, IconClock } from '@tabler/icons-react';
import { formatDuration } from '../../utils';

interface WorkoutInfoProps {
  startTime: Date;
  endTime: Date | null;
  totalDuration: number;
}

export const WorkoutInfo = ({ startTime, endTime, totalDuration }: WorkoutInfoProps) => (
  <Box p="md" bg="var(--mantine-color-gray-0)">
    <Group gap="xl">
      <ThemeIcon variant="light" size="xl" color="blue">
        <IconCalendar aria-label="календарь"/>
      </ThemeIcon>
      <Flex direction="column" gap="xs">
        <Group gap="sm">
          <IconClock size={18} aria-label="начало"/>
          <Text size="sm">Начало: {startTime.toLocaleTimeString()}</Text>
        </Group>
        <Group gap="sm">
          <IconClock size={18} aria-label="окончание"/>
          <Text size="sm">Окончание: {endTime?.toLocaleTimeString() ?? 'N/A'}</Text>
        </Group>
        <Group gap="sm">
          <IconAward size={18} aria-label="длительность"/>
          <Text size="sm">Длительность: {formatDuration(totalDuration)}</Text>
        </Group>
      </Flex>
    </Group>
  </Box>
);