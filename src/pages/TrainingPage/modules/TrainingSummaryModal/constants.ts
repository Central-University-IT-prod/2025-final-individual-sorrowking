import { IconClock, IconRepeat, IconRun, IconWeight } from "@tabler/icons-react";
import { formatDuration } from "./utils";

 
export const targetResultConfig = {
  distance: {
    icon: IconRun,
    color: 'blue',
    format: (value: number) => `${value} м`
  },
  weight: {
    icon: IconWeight,
    color: 'red',
    format: (value: number) => `${value} кг`
  },
  time: {
    icon: IconClock,
    color: 'orange',
    format: (value: number) => formatDuration(value)
  },
  repeats: {
    icon: IconRepeat,
    color: 'green',
    format: (value: number) => `${value} раз`
  }
};