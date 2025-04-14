import { Card, Group, Text } from '@mantine/core';
import { getTargetMeta, formatTargetValue } from '../../utils/currentExerciseUtils';
import styles from './ExerciseMetricCard.module.scss'
interface ExerciseMetricCardProps {
  type: string;
  value: number;
  disabled: boolean;
  isSmallScreen: boolean | undefined;
}

export const ExerciseMetricCard = ({ type, value, disabled, isSmallScreen }: ExerciseMetricCardProps) => {
  const { icon: Icon, label, color } = getTargetMeta(type);
  
  return (
    <Card
      p="lg"
      radius="lg"
      shadow="md"
      className={styles.metricCard}
      style={{ 
        borderColor: `var(--mantine-color-${color}-6)`,
        filter: disabled ? 'grayscale(1)' : 'none' 
      }}
    >
      <Group gap="sm" justify='center'>
        {Icon && <Icon size={isSmallScreen ? 24 : 32} color={`var(--mantine-color-${color}-6)`} />}
        <div>
          <Text size="sm" fw={500}>{label}</Text>
          <Text fw={900} size={isSmallScreen ? "md" : "xl"}>
            {formatTargetValue(type, value)}
          </Text>
        </div>
      </Group>
    </Card>
  );
};