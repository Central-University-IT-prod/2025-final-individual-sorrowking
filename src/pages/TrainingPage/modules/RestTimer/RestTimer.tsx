import { Group, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ControlButtons, FunFactCard, TimeAdjustment, TimerRing } from './components';
import { useRestTimer } from './hooks/useRestTimer';

interface RestTimerProps {
  initialSeconds: number;
  onComplete: () => void;
  onSkip: () => void;
}

const RestTimer = ({ initialSeconds, onComplete, onSkip }: RestTimerProps) => {
  const isSmallScreen = useMediaQuery('(max-width: 800px)');
  const { 
    timeLeft, 
    maxTime, 
    isPaused, 
    handleTimeAdjustment, 
    togglePause 
  } = useRestTimer(initialSeconds, onComplete);

  return (
    <div style={{ position: 'relative', padding: '20px' }}>
      <Group justify="center" mb="lg">
        <Title order={2}>Время отдыха!</Title>
      </Group>

      <TimeAdjustment
        timeLeft={timeLeft}
        maxTime={maxTime}
        isSmallScreen={isSmallScreen}
        handleTimeAdjustment={handleTimeAdjustment}
      >
        <TimerRing
          timeLeft={timeLeft}
          maxTime={maxTime}
          isSmallScreen={isSmallScreen}
        />
      </TimeAdjustment>

      <FunFactCard />

      <ControlButtons
        isPaused={isPaused}
        togglePause={togglePause}
        onSkip={onSkip}
      />
    </div>
  );
};

export default RestTimer;