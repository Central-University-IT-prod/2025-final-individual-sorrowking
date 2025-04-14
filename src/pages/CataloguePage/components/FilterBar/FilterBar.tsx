import React, { useState } from 'react';
import styles from './FilterBar.module.scss';
import { FilterBarProps } from './interfaces';
import Select from 'react-select/creatable';
import { OptionType, orangeSelectStyles, purpleSelectStyles } from '@/shared/custom/customSelect';
import { EXERCISE_DIFFICULTY_FILTERS } from '@/shared/constants/filters';
import { MultiValue, SingleValue } from 'react-select';
import { Drawer, Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react'; 

const FilterBar: React.FC<FilterBarProps> = ({ filterState, filterHandlers, allTags, allEquipment }) => {
    
  const { searchTerm, selectedDifficulty, selectedEquipments, selectedTags } = filterState;
  const { onSearchChange, onDifficultyChange, onEquipmentsChange, onTagsChange } = filterHandlers;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleEquipmentChange = (selected: MultiValue<OptionType>) => {
    onEquipmentsChange(selected.map(opt => opt.value));
  };

  const handleTagChange = (selected: MultiValue<OptionType>) => {
    onTagsChange(selected.map(opt => opt.value));
  };

  const handleDifficultyChange = (selected: SingleValue<OptionType>) => {
    onDifficultyChange(selected?.value || "")
  };

  const filterControls = (
    <>
      <Input
        leftSection={<IconSearch size={16} aria-label='найти упражнения'/>} 
        placeholder="Найти упражнения"
        aria-label="найти упражнения"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.currentTarget.value)}
        size="md"
        radius="md"

      />
      
      <Select<OptionType, true>
        isClearable
        options={EXERCISE_DIFFICULTY_FILTERS}
        value={EXERCISE_DIFFICULTY_FILTERS.find(opt => opt.value === selectedDifficulty)}
        onChange={handleDifficultyChange}
        placeholder="Уровень сложности"
        noOptionsMessage={() => "Нет вариантов"}
        styles={orangeSelectStyles}
        formatCreateLabel={(input) => `Создать "${input}"`}
        aria-label='выбор уровня сложности'
      />

      <Select<OptionType, true>
        isMulti
        options={allEquipment}
        value={selectedEquipments.map(e => ({ value: e, label: e }))}
        onChange={handleEquipmentChange}
        placeholder="Оборудование"
        noOptionsMessage={() => "Нет вариантов"}
        styles={orangeSelectStyles}
        className={styles.filterBar__filterMultiSelect}
        formatCreateLabel={(input) => `Создать "${input}"`}
        aria-label='выбор оборудования'
      />

      <Select<OptionType, true>
        isMulti
        options={allTags}
        value={selectedTags.map(t => ({ value: t, label: t }))}
        onChange={handleTagChange}
        placeholder="Теги"
        noOptionsMessage={() => "Нет вариантов"}
        styles={purpleSelectStyles}
        className={styles.filterBar__filterMultiSelect}
        formatCreateLabel={(input) => `Создать "${input}"`}
        aria-label='выбор тегов'
      />
    </>
  );

  return (
    <>
      <button className={styles.filterBar__menuButton} aria-label="Открыть фильтры" onClick={toggleMenu}>
        Открыть фильтры
      </button>

      <Drawer
        opened={isMenuOpen}
        onClose={toggleMenu}
        title="Фильтры"
        padding="md"
        size="xs"
        position="right"
        overlayProps={{ opacity: 0.5, blur: 4 }}
        closeButtonProps={{
          'aria-label': 'закрыть меню фильтров'
        }}
      >
        <div className={styles.sideFilterBar}> {filterControls} </div>
      </Drawer>

      <div className={styles.filterBar}>{filterControls}</div>
    </>
  );
};

export default FilterBar;