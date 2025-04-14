import { Badge } from '@mantine/core';
import { DIFFICULTY_GRADIENTS } from "@/shared/constants/difficulty";
import styles from './DifficultyBadge.module.scss'

const difficultyItems = {
  easy: "Базовый",
  medium: "Средний",
  hard: "Тяжелый"
};

interface DifficultyBadgeProps {
  difficulty: keyof typeof difficultyItems;
}

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty }) => (
  <Badge
    variant="gradient"
    gradient={DIFFICULTY_GRADIENTS[difficulty]}
    radius="xl"
    size="sm"
    className={styles.difficultyBadge}
  >
    {difficultyItems[difficulty]}
  </Badge>
);