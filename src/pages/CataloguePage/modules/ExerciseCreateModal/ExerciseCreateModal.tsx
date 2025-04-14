import { Box, Modal, Text } from '@mantine/core';
import { Exercise } from '@/shared/types/types';
import { BasicInfo, SelectorsSection, TargetSection, TextSection, ImageSection, ModalActions } from './components';

import { useExerciseFormState, useImageHandler, useSelectHandlers, useSubmitHandler } from './hooks';
import { OptionType } from '@/shared/custom/customSelect';

interface ExerciseCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  allEquipment: OptionType[];
  allTags: OptionType[];
  exerciseToEdit?: Exercise | null;
}

const ExerciseCreateModal: React.FC<ExerciseCreateModalProps> = ({
  isOpen,
  onClose,
  allEquipment,
  allTags,
  exerciseToEdit
}) => {
  const exerciseState = useExerciseFormState(exerciseToEdit);
  const selectState = useSelectHandlers(allEquipment, allTags, exerciseToEdit?.equipment, exerciseToEdit?.tags);
  const imageState = useImageHandler(exerciseToEdit);

  const handleClose = () => {
    exerciseState.reset();     
    selectState.reset();     
    imageState.reset();
    onClose();
  };

  const { handleSubmit } = useSubmitHandler(
    handleClose,
    exerciseState,
    imageState,
    {
      equipment: selectState.equipment,
      tags: selectState.tags
    },
    exerciseToEdit
  );
  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={<Text size="xl" fw={700}>{exerciseToEdit ? 'Редактировать упражнение' : 'Создать упражнение'}</Text>}
      size="lg"
      padding="xl"
      centered
      closeButtonProps={{
        'aria-label': 'Закрыть окно редактирования упражнения',
      }}
    >
      <Box>
        <BasicInfo
          title={exerciseState.title}
          description={exerciseState.description}
          difficulty={exerciseState.difficulty}
          onTitleChange={exerciseState.setTitle}
          onDescriptionChange={exerciseState.setDescription}
          onDifficultyChange={exerciseState.setDifficulty}
        />

        <SelectorsSection
          equipment={selectState.equipment}
          tags={selectState.tags}
          equipmentOptions={selectState.equipmentOptions}
          tagOptions={selectState.tagOptions}
          onEquipmentChange={selectState.handleEquipmentChange}
          onTagsChange={selectState.handleTagsChange}
          onCreateEquipment={selectState.handleCreateEquipment}
          onCreateTag={selectState.handleCreateTag}
        />

        <TargetSection
          targetResult={exerciseState.targetResult}
          averageValues={exerciseState.averageValues}
          stableValues={exerciseToEdit?.averageValues}
          onTargetChange={exerciseState.setTargetResult}
          onAverageValuesChange={exerciseState.setAverageValues}
        />

        <TextSection
          text={exerciseState.text}
          onChange={exerciseState.setText}
        />

        <ImageSection
          preview={imageState.preview}
          onUpload={imageState.handleImageDrop}
        />

        <ModalActions
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
      </Box>
    </Modal>
  );
};

export default ExerciseCreateModal;