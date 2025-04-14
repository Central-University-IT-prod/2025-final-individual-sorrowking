export const formatTime = (sec: number): string => {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const calculateColor = (maxTime: number, timeLeft: number): string => {
  const progress = (maxTime - timeLeft) / maxTime;
  const hue = (1 - progress) * 120;
  return `hsl(${hue}, 70%, 50%)`;
};