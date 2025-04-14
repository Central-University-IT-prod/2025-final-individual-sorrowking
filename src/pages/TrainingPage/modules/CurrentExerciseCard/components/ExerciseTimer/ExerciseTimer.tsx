import { useEffect, useRef, useState } from 'react';
import { RingProgress, Text, Center, Flex, ActionIcon, Tooltip, useMantineTheme } from '@mantine/core';
import { IconPlayerPause, IconPlayerPlay, IconRefresh } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@mantine/hooks';
import styles from './ExerciseTimer.module.scss'

export const ExerciseTimer = ({
  seconds,
  onComplete,
}: {
  seconds: number;
  onComplete: () => void;
}) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const theme = useMantineTheme();
  const isSmallScreen = useMediaQuery('(max-width: 800px)');
  const resetTimer = () => {
    setTimeLeft(seconds);
    setIsPaused(false);
  };

  const togglePause = () => {
    setIsPaused(prev => {
      if (!prev && timerRef.current) {
        clearInterval(timerRef.current);
      }
      return !prev;
    });
  };

  useEffect(() => {
    setTimeLeft(seconds);
    setIsPaused(false);
  }, [seconds]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timeLeft, isPaused, onComplete]);

  const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const calculateColor = () => {
    const progress = (seconds - timeLeft) / seconds;
    const hue = (1 - progress) * 120;
    return `hsl(${hue}, 70%, 50%)`;
  };

  return (
    <Flex justify="center" align="center" gap={isSmallScreen ? "sm" : "xl"}>
      <Tooltip label="Перезапустить таймер">
        <ActionIcon
          variant="light"
          size="xl"
          radius="xl"
          onClick={resetTimer}
          aria-label="Перезапустить таймер"
        >
          <IconRefresh size={24} aria-label="перезапуск"/>
        </ActionIcon>
      </Tooltip>
      <RingProgress
        size={isSmallScreen ? 125 : 200}
        thickness={6}
        sections={[{ 
          value: (timeLeft / seconds) * 100,
          color: calculateColor(),
        }]}
        className={styles.exerciseTimer}
        label={
          <Center>
            <motion.div
              key={timeLeft}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1}}
              transition={{ duration: 0.3 }}
            >
              <Text 
                fw={800} 
                size={isSmallScreen ? "25px" : "42px"}
                style={{
                  fontFamily: 'monospace',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  color: theme.colors.gray[7]
                }}
              >
                {formatTime(timeLeft)}
              </Text>
            </motion.div>
          </Center>
        }
        />

      <Tooltip label={isPaused ? 'Продолжить' : 'Пауза'}>
        <ActionIcon
          variant="light"
          size="xl"
          radius="xl"
          onClick={togglePause}
          color={isPaused ? 'blue' : 'gray'}
          aria-label={isPaused ? 'Продолжить' : 'Пауза'}
        >
          {isPaused ? <IconPlayerPlay size={24} aria-label="продолжить"/> : <IconPlayerPause size={24} aria-label="приостанить" />}
        </ActionIcon>
      </Tooltip>
    </Flex>
  );
};
