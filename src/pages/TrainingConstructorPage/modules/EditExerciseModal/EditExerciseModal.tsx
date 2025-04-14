import { useEffect, useState } from "react";
import {
  Modal,
  Title,
  Text,
  Group,
  Slider,
  NumberInput,
  Button,
  ThemeIcon,
  Stack
} from "@mantine/core";
import { IconRun, IconClock, IconRepeat, IconWeight } from "@tabler/icons-react";
import { SelectedExercise } from "@/shared/types/types";
import { targetResultLabels } from "@/pages/CataloguePage/modules/ExerciseCreateModal/constants";

interface ExerciseEditModalProps {
  opened: boolean;
  selectedExercise: SelectedExercise;
  onClose: () => void;
  onSave: (targetExercise: SelectedExercise, targetValues: Record<string, number>) => void;
}

const EditExerciseModal: React.FC<ExerciseEditModalProps> = ({
  opened,
  selectedExercise,
  onClose,
  onSave
}) => {
  const [targetValues, setTargetValues] = useState<Record<string, number>>({});

  useEffect(() => {
    setTargetValues(selectedExercise.targetValues);
  }, [selectedExercise]);

  const handleInputChange = (target: string, value: number) => {
    setTargetValues(prev => ({ ...prev, [target]: value }));
  };

  const handleSave = () => {
    onSave(selectedExercise, targetValues);
  };

  const targetIcons = {
    distance: <IconRun size={20} area-label="дистанция"/>,
    weight: <IconWeight size={20} area-label="вес"/>,
    time: <IconClock size={20} area-label="время"/>,
    repeats: <IconRepeat size={20} area-label="число повторений"/>
  };

  const exerciseLimitCoef = 5;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Text size="xl" fw={700}>Редактирование упражнения</Text>}
      size="lg"
      radius="md"
      padding="xl"
    >
      <Stack gap="lg">
        <Title order={4}>{selectedExercise.exercise.title}</Title>

        {selectedExercise.exercise.targetResult.map(target => (
          <div key={target}>
            <Group
              justify="space-between"
              style={{
                backgroundColor: "#f0f0f0",
                padding: "8px 12px",
                borderRadius: 20,
                marginBottom: 8
              }}
            >
              <Text size="sm">{targetResultLabels[target]}</Text>
              <ThemeIcon
                size={30}
                radius="xl"
                color="#ff6b35"
                style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}
              >
                {targetIcons[target]}
              </ThemeIcon>
            </Group>

            <Group grow mt="xs" gap="xl">
              <NumberInput
                value={targetValues[target] || 1}
                min={1}
                max={(selectedExercise.exercise.averageValues?.[target] || 100) * exerciseLimitCoef}
                onChange={(value) => handleInputChange(target, Number(value))}
                aria-label="выбрать значение параметра (текстовый ввод)"
                clampBehavior="strict"
              />
              <Slider
                value={targetValues[target] || 1}
                min={1}
                max={(selectedExercise.exercise.averageValues?.[target] || 100) * exerciseLimitCoef}
                onChange={(value) => handleInputChange(target, value)}
                thumbLabel="выбрать значение параметра (слайдер)"
              />
            </Group>
          </div>
        ))}

        <Group justify="flex-end" mt="xl">
          <Button variant="default" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={handleSave}>Сохранить</Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default EditExerciseModal;