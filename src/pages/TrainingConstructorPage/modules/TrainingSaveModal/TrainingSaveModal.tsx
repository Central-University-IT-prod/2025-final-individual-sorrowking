import { Modal, TextInput, Button, Group, Textarea, Stack } from '@mantine/core';
import { IconDeviceFloppy, IconPlayerPlay } from '@tabler/icons-react';

interface TrainingSaveModalProps {
  opened: boolean;
  onClose: () => void;
  trainingTitle: string;
  setTrainingTitle: (title: string) => void;
  trainingDescription: string;
  setTrainingDescription: (description: string) => void;
  handleSaveTraining: () => void;
  handleSaveAndRun: () => void; // Добавлен новый обработчик
  editingTrainingId: string | null;
}

export const TrainingSaveModal: React.FC<TrainingSaveModalProps> = ({
  opened,
  onClose,
  trainingTitle,
  setTrainingTitle,
  trainingDescription,
  setTrainingDescription,
  handleSaveTraining,
  handleSaveAndRun,
  editingTrainingId,
}) => {
  const isValid = trainingTitle.trim().length > 0;

  const handleSubmit = (action: 'save' | 'save-and-run') => {
    if (!isValid) return;
    
    if (action === 'save-and-run') {
      handleSaveAndRun();
    } else {
      handleSaveTraining();
    }
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Сохранение тренировки"
      centered
      radius="md"
      size="lg"
      closeButtonProps={{
        'aria-label': 'закрыть окно сохранения'
      }}
    >
      <Stack>
        <TextInput
          label="Название тренировки"
          placeholder="Введите название"
          value={trainingTitle}
          onChange={(e) => setTrainingTitle(e.currentTarget.value)}
          size="md"
          radius="md"
          required
        />

        <Textarea
          label="Описание тренировки"
          placeholder="Добавьте описание (необязательно)"
          value={trainingDescription}
          onChange={(e) => setTrainingDescription(e.currentTarget.value)}
          autosize
          minRows={3}
          maxRows={6}
        />

        <Group justify="flex-end" mt="xl" gap="sm">
          <Button
            variant="outline"
            size="md"
            radius="md"
            onClick={() => handleSubmit('save-and-run')}
            disabled={!isValid}
            leftSection={<IconPlayerPlay size={20} stroke={2.5} aria-label="запуск"/>}
          >
            Запустить один раз
          </Button>

          <Button
            size="md"
            radius="md"
            onClick={() => handleSubmit('save')}
            disabled={!isValid}
            leftSection={<IconDeviceFloppy size={20} stroke={2.5} aria-label="сохранение"/>}
          >
            {editingTrainingId ? 'Обновить тренировку' : 'Сохранить тренировку'}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
