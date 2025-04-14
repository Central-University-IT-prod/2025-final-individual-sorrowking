import ExerciseCardTraining from "../ExerciseTrainingCard";
import { Exercise } from "@/shared/types/types";
import { useSortable } from "@dnd-kit/sortable";
import styles from "./SortableSlot.module.scss";


interface SortableSlotProps {
  exercise: Exercise;
  uuid: string;
  onRemoveClick: () => void;
  onEditClick: () => void
  mode: 'delete' | 'arrange' | 'edit';
  targetValues: Record<string, number>;
}

const SortableSlot: React.FC<SortableSlotProps> = ({ exercise, uuid, onRemoveClick, onEditClick, mode, targetValues  }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: uuid, disabled: mode !== 'arrange' });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    zIndex: transform ? 1 : 0,
  };

  const handleClick = () => {
    if (mode === 'delete') {
      onRemoveClick();
    } else if (mode === 'edit' && onEditClick) {
      onEditClick();
    }
  };

  return (
    <div
    ref={setNodeRef}
    style={style}
    {...(mode === 'arrange' ? { ...attributes, ...listeners } : {})}
    className={styles.slotContainer}
    onClick={handleClick} 
  >


    <ExerciseCardTraining {...exercise} targetValues={targetValues} />
  </div>
  );
};

export default SortableSlot;