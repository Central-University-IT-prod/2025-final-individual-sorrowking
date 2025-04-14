import { Flex, ActionIcon } from '@mantine/core';
import { IconPlus, IconMinus } from '@tabler/icons-react';

interface TimeAdjustmentProps {
  timeLeft: number;
  maxTime: number;
  isSmallScreen: boolean | undefined;
  handleTimeAdjustment: (delta: number) => void;
  children: React.ReactNode;
}

const TimeAdjustment = ({
  timeLeft,
  isSmallScreen,
  handleTimeAdjustment,
  children
}: TimeAdjustmentProps) => (
  <Flex align="center" justify="center" gap={isSmallScreen ? "md" : "xl"} mb="xl">
    <ActionIcon
      variant="light"
      size="xl"
      radius="xl"
      onClick={() => handleTimeAdjustment(-10)}
      disabled={timeLeft <= 10}
      style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      aria-label='уменьшить время на 10 секунд'
    >
      <IconMinus size={24} aria-label="уменьшить"/>
    </ActionIcon>

    {children}

    <ActionIcon
      variant="light"
      size="xl"
      radius="xl"
      onClick={() => handleTimeAdjustment(10)}
      style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      aria-label='увеличить время на 10 секунд'
    >
      <IconPlus size={24} aria-label='увеличить время на 10 секунд'/>
    </ActionIcon>
  </Flex>
);

export default TimeAdjustment;