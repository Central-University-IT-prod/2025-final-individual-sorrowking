import React, { useState } from 'react';
import {
  Modal,
  TextInput,
  Select,
  NumberInput,
  Slider,
  Group,
  Button,
  Stack,
  Text
} from '@mantine/core';
import { IconRuler, IconWeight, IconUser, IconFriends, IconCalendar } from '@tabler/icons-react';

interface UserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    name: string;
    gender: 'male' | 'female' | undefined;
    age: number;
    height: number;
    weight: number;
  }) => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | undefined>('male');
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [age, setAge] = useState(25);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, gender, age, height, weight });
    
  };

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title="Для начала введите свои данные:"
      size="md"
      centered
      radius="md"
      withCloseButton={false}
      closeOnClickOutside={false}
      closeOnEscape={false}
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="lg">
          <TextInput
            label={
              <Group gap="xs">
                <IconUser size={18} aria-label="Имя"/>
                <Text size="sm">Имя</Text>
              </Group>
            }
            placeholder="Введите ваше имя"
            aria-label="введите ваше имя"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />

          <Select
            label={
              <Group gap="xs">
                <IconFriends size={18} aria-label="Пол"/>
                <Text size="sm">Пол</Text>
              </Group>
            }
            placeholder="Выберите пол"
            value={gender}
            onChange={(value) => setGender(value as 'male' | 'female' | undefined)}
            data={[
              { value: 'male', label: 'Мужской' },
              { value: 'female', label: 'Женский' },
            ]}
          />

          <div>
            <Group mb="xs" gap="xs">
              <IconCalendar size={18} aria-label="Возраст"/>
              <Text size="sm">Возраст</Text>
            </Group>
            <Group grow gap="xl">
              <NumberInput
                value={age}
                aria-label="Введите ваш возраст (текстовый ввод)"
                onChange={(value) => setAge(Number(value))}
              />
              <Slider
                min={10}
                max={120}
                value={age}
                onChange={setAge}
                aria-label="Введите ваш возраст (слайдер)"
                label={(value) => `${value} лет`}
                flex={1}
              />
            </Group>
          </div>

          <div>
            <Group mb="xs" gap="xs">
              <IconRuler size={18} aria-label="Рост"/>
              <Text size="sm">Рост</Text>
            </Group>
            <Group grow gap="xl">
              <NumberInput
                value={height}
                aria-label="Введите ваш рост (текстовый ввод)"
                onChange={(value) => setHeight(Number(value))}
              />
              <Slider
                min={140}
                max={220}
                value={height}
                onChange={setHeight}
                aria-label="Введите ваш рост (слайдер)"
                label={(value) => `${value} см`}
                flex={1}
              />
            </Group>
          </div>

          <div>
            <Group mb="xs" gap="xs">
              <IconWeight size={18} aria-label="Вес"/>
              <Text size="sm">Вес</Text>
            </Group>
            <Group grow gap="xl">
              <NumberInput
                value={weight}
                aria-label="Введите ваш вес (текстовый ввод)"
                onChange={(value) => setWeight(Number(value))}
              />
              <Slider
                value={weight}
                onChange={setWeight}
                label={(value) => `${value} кг`}
                aria-label="Введите ваш вес (слайдер)"
                flex={1}
                thumbLabel="выбрать значение параметра"
              />
            </Group>
          </div>

          <Button type="submit" fullWidth mt="md">
            Сохранить
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default UserDetailModal;