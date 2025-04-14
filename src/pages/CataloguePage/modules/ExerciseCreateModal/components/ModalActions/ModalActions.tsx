import { Group, Button } from '@mantine/core';

interface ModalActionsProps {
  onClose: () => void;
  onSubmit: () => void;
}

export const ModalActions: React.FC<ModalActionsProps> = ({ onClose, onSubmit }) => (
  <Group justify="flex-end" mt="xl">
    <Button variant="outline" onClick={onClose} aria-label="закрыть редактирование">
      Отмена
    </Button>
    <Button onClick={onSubmit} aria-label="подтвердить редактирование">
      Подтвердить
    </Button>
  </Group>
);