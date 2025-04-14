import { useState, useEffect } from 'react';

export const useRestTimer = (initialSeconds: number, onComplete: () => void) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [maxTime, setMaxTime] = useState(initialSeconds);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setTimeLeft(initialSeconds);
    setMaxTime(initialSeconds);
    setIsPaused(false);
  }, [initialSeconds]);

  useEffect(() => {
    if (timeLeft <= 0 || isPaused) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isPaused]);

  useEffect(() => {
    if (timeLeft === 0) onComplete();
  }, [timeLeft, onComplete]);

  const handleTimeAdjustment = (delta: number) => {
    setTimeLeft(prev => {
      const newTime = Math.max(10, prev + delta);
      setMaxTime(currentMax => Math.max(currentMax, newTime));
      return newTime;
    });
  };

  const togglePause = () => setIsPaused(prev => !prev);

  return {
    timeLeft,
    maxTime,
    isPaused,
    handleTimeAdjustment,
    togglePause
  };
};