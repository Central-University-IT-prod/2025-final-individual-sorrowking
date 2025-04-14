import React, { useMemo, useState } from 'react';
import { FilterBar } from './components';
import { ExerciseCreateModal, ExerciseCardSection } from './modules';
import styles from './CataloguePage.module.scss';
import useExerciseStore from '@/shared/stores/exerciseStore';
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';


const CataloguePage: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedEquipments, setSelectedEquipments] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const userExercises = useExerciseStore((state) => state.exercises);

  const filterTags = useMemo(() =>
    [...new Set(userExercises.flatMap(e => e.tags || []))]
      .sort()
      .map(tag => ({ value: tag, label: tag })),
    [userExercises]
  );
  
  const filterEquipment = useMemo(() =>
    [...new Set(userExercises.flatMap(e => e.equipment || []))]
      .sort()
      .map(equipment => ({ value: equipment, label: equipment })),
    [userExercises]
  );
  // фильтрация упражнений по названию, сложности, оборудованию, тегам
  const filteredExercises = userExercises.filter((exercise) => {
    const matchesSearch = exercise.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty ? exercise.difficulty === selectedDifficulty : true;
    const matchesEquipment = selectedEquipments.length > 0 
        ? (exercise.equipment || []).some(eq => selectedEquipments.includes(eq))
        : true;
    
    // Для тегов: упражнение должно содержать хотя бы один из выбранных тегов
    const matchesTag = selectedTags.length > 0
        ? (exercise.tags || []).some(tag => selectedTags.includes(tag))
        : true;

    return matchesSearch && matchesDifficulty && matchesEquipment && matchesTag;
  });

  const filterState = {
    searchTerm,
    selectedDifficulty,
    selectedEquipments,
    selectedTags,
  };

  const filterHandlers = {
    onSearchChange: setSearchTerm,
    onDifficultyChange: setSelectedDifficulty,
    onEquipmentsChange: setSelectedEquipments,
    onTagsChange: setSelectedTags,
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  return (
    <div className={styles.catalogue}>


      <div className={styles.catalogue__barContainer}>
        <FilterBar
          filterState={filterState}
          filterHandlers={filterHandlers}
          allTags={filterTags}
          allEquipment={filterEquipment}
        />

        <Tooltip
          label="Добавить упражнение"
          position="bottom"
          withArrow
          transitionProps={{ duration: 300 }}
        >
          <ActionIcon
            variant="filled"
            color="blue"
            size="xl"
            onClick={openModal}
            aria-label='добавить упражнение'
          >
            <IconPlus size={24} aria-label='добавить упражнение'/>
          </ActionIcon>
        </Tooltip>
      </div>


      <div className={styles.catalogue__cardSectionWrapper}>
        <ExerciseCardSection 
          exercises={filteredExercises}
          filterTags={filterTags}
          filterEquipment={filterEquipment}
        />
      </div>

      <ExerciseCreateModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        allEquipment={filterEquipment}
        allTags={filterTags}
      />

    </div>

  );
};


export default CataloguePage;