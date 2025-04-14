import { Flex, ThemeIcon } from '@mantine/core';
import { IconRun, IconWeight, IconClock, IconRepeat } from '@tabler/icons-react';
import { TargetResult } from '@/shared/types/types';

const targetIcons = {
  distance: <IconRun size={20} aria-label="Дистанция" />,
  weight: <IconWeight size={20} aria-label="Вес" />,
  time: <IconClock size={20} aria-label="Время" />,
  repeats: <IconRepeat size={20} aria-label="Количество повторений" />,
};

interface TargetIconsProps {
  targetResult: TargetResult[];
}

export const TargetIcons: React.FC<TargetIconsProps> = ({ targetResult }) => (
  <Flex gap="xs" direction='column' style={{ position: 'absolute', top: 16, left: 16 }}>
    {Object.entries(targetIcons).map(([key, icon]) =>
      targetResult.includes(key as TargetResult) ? (
        <ThemeIcon
          key={key}
          radius="xl"
          size={36}
          variant="gradient"
          gradient={{ from: 'orange.6', to: 'red.6' }}
        >
          {icon}
        </ThemeIcon>
      ) : null
    )}
  </Flex>
);