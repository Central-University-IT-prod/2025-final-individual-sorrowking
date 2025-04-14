import { TextInput, Textarea, Select } from '@mantine/core';

interface BasicInfoProps {
  title: string;
  description: string;
  difficulty: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onDifficultyChange: (value: "easy" | "medium" | "hard") => void;
}

export const BasicInfo: React.FC<BasicInfoProps> = ({
  title,
  description,
  difficulty,
  onTitleChange,
  onDescriptionChange,
  onDifficultyChange,
}) => (
  <>
    <TextInput
      label="Название упражнения"
      placeholder="Введите название"
      value={title}
      onChange={(e) => onTitleChange(e.currentTarget.value)}
      required
      size="md"
      mb="md"
      aria-label="введите название упражнения"
    />

    <Textarea
      label="Описание"
      placeholder="Введите краткое описание упражнения"
      value={description}
      onChange={(e) => onDescriptionChange(e.currentTarget.value)}
      required
      size="md"
      mb="md"
      aria-label="введите описание упражнения"
    />

    <Select
      label="Сложность"
      value={difficulty}
      onChange={(value) => onDifficultyChange(value as string)}
      data={[
        { value: 'easy', label: 'Легкий' },
        { value: 'medium', label: 'Средний' },
        { value: 'hard', label: 'Сложный' },
      ]}
      required
      my='md'
      aria-label="введите сложность упражнения"
    />
  </>
);