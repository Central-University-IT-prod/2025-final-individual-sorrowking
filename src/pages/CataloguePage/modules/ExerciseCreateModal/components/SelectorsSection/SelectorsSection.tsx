import { Text } from '@mantine/core';
import CreatableSelect from 'react-select/creatable';
import { OptionType, orangeSelectStyles, purpleSelectStyles } from '@/shared/custom/customSelect';
import styles from './SelectorsSection.module.scss'
interface SelectorsSectionProps {
  equipment: string[];
  tags: string[];
  equipmentOptions: OptionType[];
  tagOptions: OptionType[];
  onEquipmentChange: (value: readonly OptionType[]) => void;
  onTagsChange: (value: readonly OptionType[]) => void;
  onCreateEquipment: (value: string) => void;
  onCreateTag: (value: string) => void;
}

export const SelectorsSection: React.FC<SelectorsSectionProps> = ({
  equipment,
  tags,
  equipmentOptions,
  tagOptions,
  onEquipmentChange,
  onTagsChange,
  onCreateEquipment,
  onCreateTag,
}) => (
  <>
    <Text size="md" my='10px'>Оборудование</Text>
    <CreatableSelect
      isMulti
      options={equipmentOptions}
      value={equipment.map(opt => ({ value: opt, label: opt }))}
      onChange={onEquipmentChange}
      onCreateOption={onCreateEquipment}
      placeholder="Выберите или введите оборудование"
      noOptionsMessage={() => "Нет вариантов. Введите для создания нового"}
      formatCreateLabel={(input) => `Создать "${input}"`}
      styles={orangeSelectStyles}
      aria-label="добавьте необходимое оборудование"
      className={styles.firstSelector}
    />

    <Text size="md" my='10px'>Теги</Text>
    <CreatableSelect
      isMulti
      options={tagOptions}
      value={tags.map(opt => ({ value: opt, label: opt }))}
      onChange={onTagsChange}
      onCreateOption={onCreateTag}
      placeholder="Выберите или введите теги"
      noOptionsMessage={() => "Нет вариантов. Введите для создания нового"}
      formatCreateLabel={(input) => `Создать "${input}"`}
      styles={purpleSelectStyles}
      aria-label="добавьте теги"
      className={styles.secondSelector}
    />
  </>
);