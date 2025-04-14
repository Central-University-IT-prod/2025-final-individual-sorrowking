import { Card } from "@mantine/core";
import styles from './ExerciseCardTraining.module.scss';
import { Exercise } from "@/shared/types/types";
import { CardBadges, CardContent, CardImage, DifficultyBadge, TargetIndicators } from "./components";

interface ExerciseCardTrainingProps extends Exercise {
  targetValues?: Record<string, number>;
}

const ExerciseCardTraining: React.FC<ExerciseCardTrainingProps> = ({
  exerciseId,
  title,
  equipment,
  tags,
  difficulty,
  targetResult,
  targetValues,
}) => {
  return (
    <Card
      withBorder
      radius="lg"
      shadow="md"
      className={styles.card}
    >
      <CardImage exerciseId={exerciseId} title={title}>
        <TargetIndicators targetResult={targetResult} targetValues={targetValues} />
        <DifficultyBadge difficulty={difficulty} />
      </CardImage>

      <CardContent title={title}>
        <CardBadges equipment={equipment} tags={tags} />
      </CardContent>
    </Card>
  );
};

export default ExerciseCardTraining;