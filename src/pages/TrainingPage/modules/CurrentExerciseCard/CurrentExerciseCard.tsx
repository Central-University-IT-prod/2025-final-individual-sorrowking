import { Box, Divider, Text, Flex } from '@mantine/core';
import { IconBolt } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { ExerciseDescription, ExerciseActionButton, ExerciseMetricCard, ExerciseTimer } from './components';
import styles from './CurrentExerciseCard.module.scss';
import { SelectedExercise } from '@/shared/types/types';

const CurrentExerciseCard = ({
  exercise,
  onComplete,
  onSkip,
  disabled,
  isLastExercise,
}: {
  exercise: SelectedExercise;
  onComplete: () => void;
  onSkip: () => void;
  disabled: boolean,
  isLastExercise: boolean
}) => {
  const targetEntries = Object.entries(exercise.targetValues);
  const hasTimer = targetEntries.some(([type]) => type === 'time');
  const isSmallScreen = useMediaQuery('(max-width: 800px)');
  
  return (
    <Box className={styles.exerciseCard}>
      <ExerciseDescription 
        title={exercise.exercise.title}
        description={exercise.exercise.description}
        instructions={exercise.exercise.text}
      />

      <Divider 
        my="xl" 
        label={
          <>
            <IconBolt size={18} aria-label="молния"/>
            <Text fw={700} c="dark" mx="xs">Цель упражнения</Text>
            <IconBolt size={18} aria-label="молния"/>
          </>
        } 
        labelPosition="center"
      />

      <Flex gap="md" wrap="wrap" justify="center" mb="xl">
        {targetEntries.map(([type, value]) => (
          <ExerciseMetricCard
            key={type}
            type={type}
            value={value}
            disabled={disabled}
            isSmallScreen={isSmallScreen}
          />
        ))}
      </Flex>

      {hasTimer && !disabled && (
        <ExerciseTimer 
          key={exercise.uuid}
          seconds={exercise.targetValues.time}
          onComplete={onComplete}
        />
      )}
      <Flex mt='32px' justify='center' gap='16px' direction={isSmallScreen ? 'column' : 'row'}>
        {(isLastExercise || !hasTimer) && (
          <ExerciseActionButton
            disabled={disabled}
            isSkip={false}
            isSmallScreen={isSmallScreen}
            onClick={onComplete}
            isLastExercise={isLastExercise}
          />
        )}

        {!isLastExercise && (
          <ExerciseActionButton
            disabled={false}
            isSkip={true}
            isSmallScreen={isSmallScreen}
            onClick={onSkip}
            isLastExercise={isLastExercise}
          />
          )
        }

      </Flex>

    </Box>
  );
}

export default CurrentExerciseCard;