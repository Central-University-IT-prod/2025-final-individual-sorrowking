import { Card, Badge, Text, Stack, Box } from '@mantine/core';
import { Exercise } from '@/shared/types/types';
import useExerciseStore from '@/shared/stores/exerciseStore';
import styles from './ExerciseCard.module.scss';
import { DIFFICULTY_GRADIENTS } from '@/shared/constants/difficulty';
import { TargetIcons } from './components/TargetIcons/TargetIcons';
import { CardImage } from './components/CardImage/CardImage';
import { CardBadges } from './components/CardBadges/CardBadges';
import { CardActions } from './components/CardActions/CardActions';

const difficultyItems = {
  easy: "Базовый",
  medium: "Средний",
  hard: "Тяжелый"
};

interface ExerciseCardProps extends Exercise {
  onEditClick: () => void;
  onDeleteClick: () => void;
  onExpandClick: () => void;
  onLikeClick: () => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exerciseId,
  title,
  difficulty,
  equipment,
  tags,
  targetResult,
  onLikeClick,
  onEditClick,
  onDeleteClick,
  onExpandClick,
}) => {
  const { isLiked } = useExerciseStore();

  return (
    <Card shadow="md" radius="lg" padding="lg" className={styles.card}>
      <TargetIcons targetResult={targetResult} />

      <Badge
        variant="gradient"
        gradient={DIFFICULTY_GRADIENTS[difficulty]}
        style={{ position: 'absolute', top: 16, right: 16 }}
        tt="uppercase"
        fw={700}
        size="md"
      >
        {difficultyItems[difficulty]}
      </Badge>

      <Card.Section>
        <CardImage exerciseId={exerciseId} title={title} />
      </Card.Section>

      <Stack mt="md" gap="sm" style={{ flex: 1 }}>
        <Box className={styles.card__header}>
          <Text ta="center" fw={700} size="xl" className={styles.card__title}>
            {title}
          </Text>
        </Box>

        <CardBadges equipment={equipment} tags={tags} />

        <CardActions
          isLiked={isLiked(exerciseId)}
          onLikeClick={onLikeClick}
          onEditClick={onEditClick}
          onExpandClick={onExpandClick}
          onDeleteClick={onDeleteClick}
        />
      </Stack>
    </Card>
  );
};

export default ExerciseCard;