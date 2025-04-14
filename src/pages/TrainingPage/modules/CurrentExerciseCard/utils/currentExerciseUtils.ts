import { IconClock, IconRepeat, IconRoute, IconBarbell, IconFlame } from '@tabler/icons-react';

export const getTargetMeta = (type: string) => {
  const meta = {
    time: { icon: IconClock, label: 'Время', color: 'orange' },
    repeats: { icon: IconRepeat, label: 'Повторения', color: 'green' },
    distance: { icon: IconRoute, label: 'Дистанция', color: 'blue' },
    weight: { icon: IconBarbell, label: 'Вес', color: 'red' },
    calories: { icon: IconFlame, label: 'Калории', color: 'pink' },
  };

  return meta[type as keyof typeof meta] || { icon: null, label: type, color: 'gray' };
};

export const formatTargetValue = (type: string, value: number) => {
  const units: Record<string, string> = {
    time: 'сек',
    reps: 'раз',
    distance: 'м',
    weight: 'кг',
    calories: 'ккал'
  };

  return `${value}${units[type] || ''}`;
};