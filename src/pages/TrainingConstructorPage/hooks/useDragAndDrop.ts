import { useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core';

export const useDragAndDrop = () => {
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 0, tolerance: 15 } })
  );

  return { sensors };
};