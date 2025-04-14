import { Textarea } from '@mantine/core';

interface TextSectionProps {
  text: string;
  onChange: (value: string) => void;
}

export const TextSection: React.FC<TextSectionProps> = ({ text, onChange }) => (
  <Textarea
    label="Текст упражнения"
    placeholder="Введите инструкции по правильному выполнению упражнения"
    value={text}
    onChange={(e) => onChange(e.currentTarget.value)}
    required
    size="md"
    my='10px'
    rows={3}
  />
);