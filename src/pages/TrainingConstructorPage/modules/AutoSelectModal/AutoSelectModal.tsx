import { Modal, MultiSelect, Button, Stack, NumberInput } from '@mantine/core';
import { IconRobot } from '@tabler/icons-react';
import { useState } from 'react';

interface DifficultyOption {
  value: string;
  label: string;
}

interface AutoSelectModalProps {
  opened: boolean;
  onClose: () => void;
  handleAutoSelect: (filters: {
    difficulties: string[];
    tags: string[];
    equipment: string[];
    count: number;
  }) => void;
  difficultyOptions: DifficultyOption[];
  tagOptions: string[];
  equipmentOptions: string[];
}

export const AutoSelectModal: React.FC<AutoSelectModalProps> = ({
  opened,
  onClose,
  handleAutoSelect,
  difficultyOptions,
  tagOptions,
  equipmentOptions,
}) => {
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [count, setCount] = useState<number>(10);

  const handleSubmit = () => {
    handleAutoSelect({
      difficulties: selectedDifficulties,
      tags: selectedTags,
      equipment: selectedEquipment,
      count: count
    });
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Автоматический подбор упражнений"
      centered
      radius="md"
      size="lg"
      closeButtonProps={{
        'aria-label': 'Закрыть авто-подбор'
      }}
    >
      <Stack gap="md">
        <NumberInput
          label="Количество упражнений"
          value={count}
          onChange={(value) => setCount(Number(value))}
          min={1}
          max={50}
          clampBehavior="strict"
        />

        <MultiSelect
          label="Уровень сложности"
          placeholder={selectedDifficulties.length === 0 ? "Без предпочтений" : undefined}
          data={difficultyOptions}
          value={selectedDifficulties}
          onChange={setSelectedDifficulties}
          hidePickedOptions
          searchable
          nothingFoundMessage="Ничего не найдено"
          clearable
        />

        <MultiSelect
          label="Теги"
          placeholder={selectedTags.length === 0 ? "Без предпочтений" : undefined}
          data={tagOptions}
          value={selectedTags}
          onChange={setSelectedTags}
          hidePickedOptions
          searchable
          nothingFoundMessage="Ничего не найдено"
          clearable
        />

        <MultiSelect
          label="Оборудование"
          placeholder={selectedEquipment.length === 0 ? "Без предпочтений" : undefined}
          data={equipmentOptions}
          value={selectedEquipment}
          onChange={setSelectedEquipment}
          hidePickedOptions
          searchable
          nothingFoundMessage="Ничего не найдено"
          clearable
        />

        <Button
          fullWidth
          size="md"
          onClick={handleSubmit}
          leftSection={<IconRobot size={20} area-label="автоподбор"/>}
          mt="sm"
        >
          Подобрать упражнения
        </Button>
      </Stack>
    </Modal>
  );
};