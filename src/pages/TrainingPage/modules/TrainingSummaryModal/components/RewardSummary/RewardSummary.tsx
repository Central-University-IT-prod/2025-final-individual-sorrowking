import { Group, Text, ThemeIcon } from '@mantine/core';
import { IconCoin, IconStar } from '@tabler/icons-react';

interface RewardSummaryProps {
  coinsEarned: number;
  expGained: number;
  previousUserData?: {
    coins: number;
  };
  currentCoins: number;
}

export const RewardSummary = ({ coinsEarned, expGained, previousUserData, currentCoins }: RewardSummaryProps) => (
  <Group justify="space-between">
    <Text size="lg" fw={600}>Получено:</Text>
    <Group gap="lg">
      <Group gap={6}>
        <ThemeIcon variant="light" color="yellow" size="md">
          <IconCoin size={20} aria-label="монета"/>
        </ThemeIcon>
        <Text fw={700} size="lg">
          {previousUserData?.coins ?? 0} → {currentCoins}
          <Text span c="green" ml="sm">+{coinsEarned}</Text>
        </Text>
      </Group>
      <Group gap={6}>
        <ThemeIcon variant="light" color="indigo" size="md">
          <IconStar size={20} aria-label="опыт"/>
        </ThemeIcon>
        <Text fw={700} size="lg">{expGained}</Text>
      </Group>
    </Group>
  </Group>
);