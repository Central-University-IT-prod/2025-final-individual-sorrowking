import { Grid, Group, ActionIcon, Tooltip } from '@mantine/core';
import { IconDeviceFloppy, IconPlus, IconRobot } from '@tabler/icons-react';

interface TopActionBarProps {
  handleSaveInitiated: () => void;
  setIsAddModalOpen: (open: boolean) => void;
  editingTrainingId: string | null;
  hasExercises: boolean;
  onOpenAutoSelect: () => void;
}

export const TopActionBar: React.FC<TopActionBarProps> = ({
  handleSaveInitiated,
  setIsAddModalOpen,
  editingTrainingId,
  hasExercises,
  onOpenAutoSelect,
}) => (
  <Grid grow m={10} align="center" justify="center">
    <Grid.Col span={12}>
      <Group justify="center" gap="md">
        <Tooltip label="Автоподбор упражнений" position="bottom" withArrow>
          <ActionIcon
            size="xl"
            radius="md"
            variant="light"
            color="violet"
            onClick={onOpenAutoSelect}
            aria-label="автоподбор упражнений"
          >
            <IconRobot size={30} stroke={1.5} aria-label="автоподбор упражнений"/>
          </ActionIcon>
        </Tooltip>

        <Tooltip label="Добавить упражнение" position="bottom" withArrow>
          <ActionIcon
            size="xl"
            radius="md"
            variant="light"
            color="blue"
            onClick={() => setIsAddModalOpen(true)}
            aria-label="добавить новое упражнение"
          >
            <IconPlus size={30} stroke={1.5} aria-label="добавить новое упражнение"/>
          </ActionIcon>
        </Tooltip>
        
        <Tooltip 
          label={editingTrainingId ? 'Обновить тренировку' : 'Сохранить тренировку'} 
          position="bottom" 
          withArrow
        >
          <div>
            <ActionIcon
              size="xl"
              radius="md"
              variant="light"
              color="green"
              onClick={handleSaveInitiated}
              disabled={!hasExercises}
              aria-label="сохранить тренировку"
            >
              <IconDeviceFloppy size={30} stroke={1.5} aria-label="сохранить тренировку"/>
            </ActionIcon>
          </div>
        </Tooltip>
      </Group>
    </Grid.Col>
  </Grid>
);