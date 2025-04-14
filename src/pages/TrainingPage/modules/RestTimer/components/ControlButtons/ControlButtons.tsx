import { Group, ActionIcon, Tooltip } from '@mantine/core';
import { 
  IconPlayerPause, 
  IconPlayerPlay, 
  IconArrowRight 
} from '@tabler/icons-react';

interface ControlButtonsProps {
  isPaused: boolean;
  togglePause: () => void;
  onSkip: () => void;
}

export const ControlButtons = ({ 
  isPaused, 
  togglePause, 
  onSkip 
}: ControlButtonsProps) => {
  return (
    <Group justify="center" gap="md" mt="xl">
      <Tooltip 
        label={isPaused ? 'Возобновить таймер' : 'Приостановить таймер'}
      >
        <ActionIcon
          variant="light"
          size="xl"
          radius="xl"
          onClick={togglePause}
          color={isPaused ? 'blue' : 'gray'}
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          aria-label={isPaused ? 'Возобновить таймер' : 'Приостановить таймер'}
        >
          {isPaused ? (
            <IconPlayerPlay size={24} aria-label="возобновить"/>
          ) : (
            <IconPlayerPause size={24} aria-label="приостановить"/>
          )}
        </ActionIcon>
      </Tooltip>

      <Tooltip label='Пропустить отдых'>
        <ActionIcon
          variant="light"
          size="xl"
          radius="xl"
          color="red"
          onClick={onSkip}
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          aria-label='пропустить отдых'
        >
          <IconArrowRight size={24} aria-label="пропустить"/> 
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};
