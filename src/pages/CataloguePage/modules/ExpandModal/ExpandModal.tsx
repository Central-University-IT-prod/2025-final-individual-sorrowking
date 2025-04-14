import React from 'react';
import {
  Modal,
  Alert,
  Paper,
  Stack,
  Text,
  Divider,
  Box,
} from '@mantine/core';
import { Exercise } from '@/shared/types/types';
import { IconInfoCircle } from '@tabler/icons-react';

interface ExpandModalProps {
  isOpen: boolean;
  onClose: () => void;
  exerciseToView: Exercise | null;
}

const ExpandModal: React.FC<ExpandModalProps> = ({ isOpen, onClose, exerciseToView }) => {
  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      size="lg"
      radius="md"
      title={
        <Text size="xl" ta="center" fw={700}>
          {exerciseToView?.title ?? ''}
        </Text>
      }
      closeButtonProps={{
        'aria-label': 'Закрыть окно просмотра упражнения',
      }}
    >
      <Box p="sm">
        <Alert
          variant="light"
          color="blue"
          icon={<IconInfoCircle size="1.2rem" aria-label="Информация" />}
          mb="xl"
          radius="md"
        >
          <Text ta="center" fw={500}>
            {exerciseToView?.description ?? ''}
          </Text>
        </Alert>

        <Divider label="Инструкции к упражнениям" labelPosition="center" mb="xl" />

        <Stack gap="lg">
          {(exerciseToView?.text?.split('\n') ?? [])
            .filter((element) => element.trim())
            .map((step, index) => (
              <Paper key={index} p="md" radius="sm" shadow="xs" withBorder>
                <Text span>{step}</Text>
              </Paper>
            ))}
        </Stack>
      </Box>
    </Modal>
  );
};

export default ExpandModal;