import { useEffect, useState } from 'react';
import { Card, Group, Text, Flex } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { FUN_FACTS } from '@/shared/constants/funFacts';
import styles from './FunFactCard.module.scss'

export const FunFactCard = () => {
  const [funFact, setFunFact] = useState('');

  useEffect(() => {
    setFunFact(FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)]);
  }, []);

  return (
    <Card 
      bg="yellow.1" 
      radius="md" 
      mt="xl" 
      mb="xl" 
      withBorder 
      className={styles.funFact}
    >
      <Group gap="xs">
        <IconInfoCircle 
          size={28} 
          aria-label="Информация" 
          color="var(--mantine-color-yellow-6)" 
        />
        <Flex 
          direction='column' 
          align='center' 
          className={styles.funFactText}
        >
          <Text size="sm" c="dark" fw={700} mb={4}>
            А вы знали?
          </Text>
          <Text size="md" c="dark">
            {funFact}
          </Text>
        </Flex>
      </Group>
    </Card>
  );
};
