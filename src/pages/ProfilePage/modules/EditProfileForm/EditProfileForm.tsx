import {
  TextInput,
  NumberInput,
  Select,
  Button,
  Flex,
  rem,
} from '@mantine/core';
import { IconUser, IconFriends, IconScale, IconRuler, IconCalendar } from '@tabler/icons-react';
import { User } from '@/shared/types/types';
import styles from './EditProfileForm.module.scss';

interface EditProfileFormProps {
  editedUser: User;
  onFieldChange: (field: keyof User, value: string | number) => void;
  onSave: () => void;
}

const EditProfileForm = ({
  editedUser,
  onFieldChange,
  onSave,
}: EditProfileFormProps) => (
  <Flex direction="column" gap="md" className={styles.editContainer}>
    <TextInput
      label="Имя"
      placeholder="Введите ваше имя"
      value={editedUser.name}
      onChange={(e) => onFieldChange('name', e.target.value)}
      leftSection={<IconUser style={{ width: rem(18), height: rem(18) }} area-label="пользователь"/>}
      variant="filled"
      radius="md"
      size="md"
      className={styles.editContainer__inputField}
    />

    <Select
      label="Пол"
      placeholder="Выберите ваш пол"
      value={editedUser.gender}
      onChange={(value) => onFieldChange('gender', value as 'male' | 'female')}
      data={[
        { value: 'male', label: 'Мужской' },
        { value: 'female', label: 'Женский' },
      ]}
      leftSection={<IconFriends style={{ width: rem(18), height: rem(18) }} area-label="пол" />}
      variant="filled"
      radius="md"
      size="md"
      className={styles.editContainer__inputField}
    />

    <NumberInput
      label="Вес"
      placeholder="Укажите ваш вес"
      value={editedUser.weight}
      onChange={(value) => onFieldChange('weight', Number(value))}
      min={30}
      max={200}
      leftSection={<IconScale style={{ width: rem(18), height: rem(18) }} area-label="вес"/>}
      variant="filled"
      radius="md"
      size="md"
      className={styles.editContainer__inputField}
    />

    <NumberInput
      label="Рост"
      placeholder="Укажите ваш рост"
      value={editedUser.height}
      onChange={(value) => onFieldChange('height', Number(value))}
      min={100}
      max={250}
      leftSection={<IconRuler style={{ width: rem(18), height: rem(18) }} area-label="рост"/>}
      variant="filled"
      radius="md"
      size="md"
      className={styles.editContainer__inputField}
    />

    <NumberInput
      label="Возраст"
      placeholder="Укажите ваш возраст"
      value={editedUser.age}
      onChange={(value) => onFieldChange('age', Number(value))}
      min={1}
      max={120}
      leftSection={<IconCalendar style={{ width: rem(18), height: rem(18) }} area-label="возраст"/>}
      variant="filled"
      radius="md"
      size="md"
      className={styles.editContainer__inputField}
    />

    <Button
      onClick={onSave}
      fullWidth
      size="md"
      radius="md"
      variant="gradient"
      gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
      className={styles.editContainer__saveButton}
    >
      Сохранить изменения
    </Button>
  </Flex>
);

export default EditProfileForm;