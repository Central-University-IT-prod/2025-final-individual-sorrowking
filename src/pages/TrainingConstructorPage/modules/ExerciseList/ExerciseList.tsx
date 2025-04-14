import { DndContext, 
  DragEndEvent, 
  DragStartEvent, 
  KeyboardSensorOptions, 
  MouseSensorOptions, 
  PointerSensorOptions, 
  SensorDescriptor, 
  TouchSensorOptions, 
  closestCorners } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { SelectedExercise } from '@/shared/types/types';
import styles from './ExerciseList.module.scss'
import SortableSlot from '../../components/SortableSlot';
type SensorOptions = 
  | PointerSensorOptions
  | KeyboardSensorOptions
  | MouseSensorOptions
  | TouchSensorOptions;
  
interface ExerciseListProps {
  sensors: SensorDescriptor<SensorOptions>[];
  selectedExercises: SelectedExercise[];
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  handleRemoveExercise: (uuid: string) => void;
  handleEditTargetExercise: (exercise: SelectedExercise) => void;
  mode: 'delete' | 'arrange' | 'edit';
}

export const ExerciseList: React.FC<ExerciseListProps> = ({
  sensors,
  selectedExercises,
  handleDragStart,
  handleDragEnd,
  handleRemoveExercise,
  handleEditTargetExercise,
  mode,
}) => (
  <DndContext
    sensors={sensors}
    collisionDetection={closestCorners}
    onDragStart={handleDragStart}
    onDragEnd={handleDragEnd}
  >
    <SortableContext
      items={selectedExercises.map((ex) => ex.uuid)}
      strategy={rectSortingStrategy}
    >
      <div className={styles.exerciseList}>
        {
          selectedExercises.map((selectedExercise) => (
            <SortableSlot
              key={selectedExercise.uuid}
              exercise={selectedExercise.exercise}
              targetValues={selectedExercise.targetValues}
              uuid={selectedExercise.uuid}
              onRemoveClick={() => handleRemoveExercise(selectedExercise.uuid)}
              onEditClick={() => handleEditTargetExercise(selectedExercise)}
              mode={mode}
            />
          ))
        }
      </div>
    </SortableContext>
  </DndContext>
);