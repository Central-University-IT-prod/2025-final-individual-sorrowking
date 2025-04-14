import React, { useMemo } from 'react';
import styles from './TrainingConstructorPage.module.scss';
import useExerciseStore from '@/shared/stores/exerciseStore';
import { SelectedExercise } from '@/shared/types/types';
import { EditExerciseModal, ExerciseSelectionModal, ExerciseList, ModeSidebar,
         TopActionBar, AutoSelectModal, TrainingSaveModal
 } from './modules';
import { useAutoSelect, useDragAndDrop, useExerciseModals, useTrainingState } from './hooks'
import { EXERCISE_DIFFICULTY_TRANSLATIONS } from '@/shared/constants/filters';

const TrainingConstructorPage: React.FC = () => {
  const { exercises, likedExercises } = useExerciseStore();
  const difficultyOptions = useMemo(() => 
    [...new Set(exercises.map(e => e.difficulty))]
      .map(diff => ({
        value: diff,
        label: EXERCISE_DIFFICULTY_TRANSLATIONS[diff as keyof typeof EXERCISE_DIFFICULTY_TRANSLATIONS] || diff
      }))
      .sort((a, b) => a.label.localeCompare(b.label)), 
    [exercises]
  );
  const tags = useMemo(() =>
    [...new Set(exercises.flatMap(e => e.tags || []))].sort(),
    [exercises]
  );
  const equipment = useMemo(() =>
    [...new Set(exercises.flatMap(e => e.equipment || []))].sort(),
    [exercises]
  );
  const { sensors } = useDragAndDrop();
  const { handleAutoSelect } = useAutoSelect();
  const {
    selectedExercises,
    trainingTitle,
    setTrainingTitle,
    trainingDescription,
    setTrainingDescription,
    mode,
    setMode,
    handleDragStart,
    handleDragEnd,
    handleRemoveExercise,
    handleSaveTraining,
    editingTrainingId 
  } = useTrainingState();
  const {
    isAddModalOpen,
    setIsAddModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    isTrainingSaveModalOpen,
    openTrainingSaveModal,
    closeTrainingSaveModal,
    isAutoSelectModalOpen,
    closeAutoSelectModal,
    openAutoSelectModal,
    modalTab,
    setModalTab,
    targetExercise,
    setTargetExercise,
    handleSelectExercise,
    handleSaveExerciseParams,
    handleEditModalClose
  } = useExerciseModals();

  const handleModeChange = (newMode: 'delete' | 'arrange' | 'edit') => {
    setMode(newMode);
  };
  const handleEditTargetExercise = (exercise: SelectedExercise) => {
    setTargetExercise(exercise);
    setIsEditModalOpen(true);
  };

  return (
    <div className={styles.trainingConstructor}>

      <div className={styles.trainingConstructor__manualChoice}>
        <TopActionBar
          handleSaveInitiated={openTrainingSaveModal}
          setIsAddModalOpen={setIsAddModalOpen}
          editingTrainingId={editingTrainingId}
          hasExercises={selectedExercises.length > 0}
          onOpenAutoSelect={openAutoSelectModal} 
        />
        <ModeSidebar
          mode={mode}
          handleModeChange={handleModeChange}
        />

        <ExerciseList
          sensors={sensors}
          selectedExercises={selectedExercises}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
          handleRemoveExercise={handleRemoveExercise}
          handleEditTargetExercise={handleEditTargetExercise}
          mode={mode}
        />
  
        <ExerciseSelectionModal
          opened={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)}
          exercises={exercises}
          likedExercises={likedExercises}
          modalTab={modalTab}
          setModalTab={setModalTab}
          handleSelectExercise={handleSelectExercise}
        />

        {targetExercise && (
          <EditExerciseModal 
            opened={isEditModalOpen}
            onClose={() => handleEditModalClose()}
            selectedExercise={targetExercise}
            onSave={handleSaveExerciseParams}
          />
        )}

        <TrainingSaveModal
          opened={isTrainingSaveModalOpen}
          onClose={closeTrainingSaveModal}
          trainingTitle={trainingTitle}
          setTrainingTitle={setTrainingTitle}
          trainingDescription={trainingDescription}
          setTrainingDescription={setTrainingDescription}
          handleSaveTraining={() => handleSaveTraining({ 
            description: trainingDescription 
          })}
          handleSaveAndRun={() => handleSaveTraining({
            description: trainingDescription,
            oneshot: true
          })}
          editingTrainingId={editingTrainingId}
        />

        <AutoSelectModal
          opened={isAutoSelectModalOpen}
          onClose={closeAutoSelectModal}
          handleAutoSelect={handleAutoSelect}
          difficultyOptions={difficultyOptions}
          tagOptions={tags}
          equipmentOptions={equipment}
        />
      </div>
    </div>
  );
};

export default TrainingConstructorPage;