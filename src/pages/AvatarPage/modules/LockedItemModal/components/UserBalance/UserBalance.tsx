import { Paper, Group, Text } from '@mantine/core';
import { IconCoin } from '@tabler/icons-react';

interface UserBalanceProps {
  userCoins: number;
}

export const UserBalance = ({ userCoins }: UserBalanceProps) => (
  <Paper p="md" radius="md" bg="orange">
    <Group gap={8} justify="center">
      <Text fz="lg" fw={700} c="white" span>
        Ваш баланс: 
      </Text>
      <IconCoin size={28} aria-label="монеты" color='white'/>
      <Text fz="lg" fw={700} span c="white">
        {userCoins}
      </Text>
    </Group>
  </Paper>
);
