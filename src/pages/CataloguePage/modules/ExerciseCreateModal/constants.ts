import { TargetResult } from "@/shared/types/types";
import { IconClock, IconRepeat, IconRoute, IconWeight } from "@tabler/icons-react";

const targetResultIcons = {
  repeats: IconRepeat,
  distance: IconRoute,
  time: IconClock,
  weight: IconWeight
};

const targetResultLabels: Record<TargetResult, string> = {
  repeats: 'Повторы',
  distance: 'Дистанция',
  time: 'Время',
  weight: 'Вес'
};

export {targetResultIcons, targetResultLabels}