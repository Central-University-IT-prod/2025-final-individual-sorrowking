import { Group, ActionIcon } from '@mantine/core';
import { IconTrash, IconSettings, IconWindowMaximize, IconHeartFilled, IconHeart } from '@tabler/icons-react';
import styles from './CardActions.module.scss'

interface CardActionsProps {
  isLiked: boolean;
  onLikeClick: () => void;
  onEditClick: () => void;
  onExpandClick: () => void;
  onDeleteClick: () => void;
}

export const CardActions: React.FC<CardActionsProps> = ({
  isLiked,
  onLikeClick,
  onEditClick,
  onExpandClick,
  onDeleteClick,
}) => (
  <Group justify="center" gap="xs" mt="auto">
    <ActionIcon
      onClick={onLikeClick}
      color="orange"
      size="lg"
      className={styles.actionButton}
      aria-label="добавить/убрать из избранных"
    >
      {isLiked ? (
        <IconHeartFilled size={20} aria-label='в избранных'/>
      ) : (
        <IconHeart size={20} aria-label='не в избранных'/>
      )}
    </ActionIcon>

    <ActionIcon 
      onClick={onEditClick} 
      color="blue" 
      size="lg" 
      className={styles.actionButton}
      aria-label="редактировать упражнение"
    >
      <IconSettings size={20} aria-label='найстройки'/>
    </ActionIcon>

    <ActionIcon 
      onClick={onExpandClick} 
      color="grape" 
      size="lg" 
      className={styles.actionButton}
      aria-label="раскрыть информацию об упражнении"
    >
      <IconWindowMaximize size={20} aria-label='раскрыть информацию'/>
    </ActionIcon>

    <ActionIcon 
      onClick={onDeleteClick} 
      color="red" 
      size="lg" 
      className={styles.actionButton}
      aria-label="удалить упражнение"
    >
      <IconTrash size={20} aria-label='удалить'/>
    </ActionIcon>
  </Group>
);