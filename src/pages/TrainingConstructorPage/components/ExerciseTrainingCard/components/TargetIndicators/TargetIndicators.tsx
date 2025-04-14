import { Flex, Group, Text } from '@mantine/core';
import { IconRun, IconClock, IconRepeat, IconWeight } from "@tabler/icons-react";
import styles from './TargetIndicators.module.scss'
import { targetGradients } from './constants';

const icons = {
  distance: <IconRun size={16} aria-label="дистанция"/>,
  weight: <IconWeight size={16} aria-label="вес"/>,
  time: <IconClock size={16} aria-label="время"/>,
  repeats: <IconRepeat size={16} aria-label="число повторений"/>,
};

interface TargetIndicatorsProps {
  targetResult: string[];
  targetValues?: Record<string, number>;
}

export const TargetIndicators: React.FC<TargetIndicatorsProps> = ({ targetResult, targetValues }) => (
  <Flex
    gap="xs"
    className={styles.targetIndicators}
  >
    {targetResult.map((target) => {
      if (!(target in icons)) return null;

      return (
        <Group
          key={target}
          gap={2}
          className={styles.targetIndicators__indicator}
          style={{
            backgroundImage: targetGradients[target as keyof typeof targetGradients],
          }}
        >
          {icons[target as keyof typeof icons]}
          <Text size="xs" c="white" fw={600}>
            {targetValues?.[target]}
          </Text>
        </Group>
      );
    })}
  </Flex>
);