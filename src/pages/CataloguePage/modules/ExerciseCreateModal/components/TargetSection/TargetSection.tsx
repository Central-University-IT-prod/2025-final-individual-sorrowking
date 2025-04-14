import { Text } from '@mantine/core';
import { TargetResultSelector } from '../TargetResultSelector/TargetResultSelector';
import { AverageValuesInput } from '../AverageValuesInput/AverageValuesInput';
import { TargetResult } from '@/shared/types/types';


interface TargetSectionProps {
  targetResult: TargetResult[];
  averageValues: Record<string, number>;
  stableValues?: Record<string, number>;
  onTargetChange: (value: TargetResult[]) => void;
  onAverageValuesChange: (value: Record<string, number>) => void;
}

export const TargetSection: React.FC<TargetSectionProps> = ({
  targetResult,
  averageValues,
  stableValues,
  onTargetChange,
  onAverageValuesChange,
}) => (
  <>
    <Text size="md" my='10px'>Целевые параметры</Text>
    <TargetResultSelector 
      selectedResult={targetResult}
      onChange={onTargetChange}
    />
    {targetResult.length > 0 && (
      <AverageValuesInput
        targetResult={targetResult}
        values={averageValues}
        stableValues={stableValues}
        onChange={onAverageValuesChange}
      />
    )}
  </>
);