import { Group, Text } from '@mantine/core';
import styles from './CardContent.module.scss'

interface CardContentProps {
  title: string;
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ title, children }) => (
  <Group gap="sm" mt="md" style={{ flexDirection: "column" }}>
    <Group justify="center" className={styles.header}>
      <Text size="lg" fw={800} c="dark.7">
        {title}
      </Text>
    </Group>
    {children}
  </Group>
);