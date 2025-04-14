import { RingProgress, Text, Center, useMantineTheme } from '@mantine/core';
import { motion } from 'framer-motion';
import { formatTime, calculateColor } from '../../utils/timerUtils';
import styles from './TimeRing.module.scss'

interface TimerRingProps {
  timeLeft: number;
  maxTime: number;
  isSmallScreen: boolean | undefined;
}

export const TimerRing = ({ timeLeft, maxTime, isSmallScreen }: TimerRingProps) => {
  const theme = useMantineTheme();

  return (
    <RingProgress
      size={isSmallScreen ? 125 : 200}
      thickness={6}
      className={styles.restTimer}
      sections={[{ 
        value: (timeLeft / maxTime) * 100,
        color: calculateColor(maxTime, timeLeft),
      }]}
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
              size={isSmallScreen ? "30px" : "42px"}
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
  );
};