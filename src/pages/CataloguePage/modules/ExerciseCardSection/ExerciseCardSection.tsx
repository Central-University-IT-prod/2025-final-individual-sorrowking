import React, { useState } from 'react';
import styles from './ExerciseCardSection.module.scss';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import ExerciseCreateModal from '../ExerciseCreateModal';
import ExpandModal from '../../modules/ExpandModal';
import { Exercise } from '@/shared/types/types'; 
import useExerciseStore from '@/shared/stores/exerciseStore';
import useTrainingStore from '@/shared/stores/trainingStore';
import { toast } from 'react-toastify';
import { OptionType } from '@/shared/custom/customSelect';
import { deleteImage } from '@/shared/utils/indexDB';


interface ExerciseCardSectionProps {
  exercises: Exercise[]
  filterTags: OptionType[];
  filterEquipment: OptionType[];
}

const ExerciseCardSection: React.FC<ExerciseCardSectionProps> = ({exercises, filterTags, filterEquipment}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isExpandModalOpen, setIsExpandModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const {deleteExercise, toggleLike } = useExerciseStore();
  const [currentRemovalExerciseId, setCurrentRemovalExerciseId] = useState("");
  const getTrainingTitlesByExerciseId = useTrainingStore(state => state.getTrainingTitlesByExerciseId)
  
  const handleDeleteExercise = (exercise: Exercise) => {
    if (exercise.exerciseId) {
      if (exercise.exerciseId == currentRemovalExerciseId) {
        deleteImage(exercise.exerciseId)
        deleteExercise(exercise.exerciseId)
        return;
      }
      else {
        setCurrentRemovalExerciseId(exercise.exerciseId)
        const removalTrainings =  getTrainingTitlesByExerciseId(exercise.exerciseId)
        if (removalTrainings.length) {
          toast.error(`Данное упражнение используется в тренировках: ${removalTrainings.join(", ")}. Нажмите ещё раз для подтверждения`)
        }
        else {
          deleteImage(exercise.exerciseId)
          deleteExercise(exercise.exerciseId)
        }
      }

    }
  };
  const handleEditExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise); 
    setIsEditModalOpen(true);
  };

  const handleExpandExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise)
    setIsExpandModalOpen(true);
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedExercise(null); 
  };

  const handleCloseExpandModal = () => {
    setIsExpandModalOpen(false);
    setSelectedExercise(null); 
  };

  const handleLikeClick = (exercise: Exercise) => {
    toggleLike(exercise);
  };


  return (
    <div className={styles.cardSection}>
      {exercises.map((exercise, index) => (
        <ExerciseCard 
          key={index} 
          {...exercise}
          onLikeClick={() => handleLikeClick(exercise)}
          onEditClick={() => handleEditExercise(exercise)}
          onDeleteClick={() => handleDeleteExercise(exercise)}
          onExpandClick={() => handleExpandExercise(exercise)}

        />
      ))}
      <ExerciseCreateModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        exerciseToEdit={selectedExercise}
        allTags={filterTags}
        allEquipment={filterEquipment}
      />
      <ExpandModal
        isOpen={isExpandModalOpen}
        onClose={handleCloseExpandModal}
        exerciseToView={selectedExercise}
      />

    </div>
  );
};

export default ExerciseCardSection