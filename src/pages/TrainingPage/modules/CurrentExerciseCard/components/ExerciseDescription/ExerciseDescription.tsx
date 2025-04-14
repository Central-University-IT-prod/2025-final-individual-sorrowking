import { Card, Group, Title, Text, Accordion, Stack } from '@mantine/core';
import { IconChevronDown, IconInfoCircle } from '@tabler/icons-react';
import styles from './ExerciseDescription.module.scss'

interface ExerciseDescriptionProps {
  title: string;
  description: string;
  instructions: string;
}

export const ExerciseDescription = ({ 
  title, 
  description, 
  instructions 
}: ExerciseDescriptionProps) => (
  <>
    <Group justify="center" mb="lg">
      <Title order={2}>{title}</Title>
    </Group>
    
    <Card withBorder radius="md" mb="xl">
      <Text size="lg">{description}</Text>
    </Card>

    <Accordion 
      variant="contained"
      mb="xl"
      chevron={<IconChevronDown size="1rem" color="#2C4E8A" />}
      classNames={{
        control: styles.exerciseDescription__control, 
        label: styles.exerciseDescription__label,
        chevron: styles.exerciseDescription__chevron,
        item: styles.exerciseDescription__item
      }}
    >
      <Accordion.Item value="instructions">
        <Accordion.Control py="sm">
          <Group gap="xs">
            <IconInfoCircle size="1.2rem" color="#3B82F6" />
            <Text fw={600} size="lg" c="blue.9">
              Инструкции
            </Text>
          </Group>
        </Accordion.Control>
        <Accordion.Panel>
          <Stack gap="xs">
            {instructions
              .split('\n')
              .filter(line => line.trim())
              .map((line, index) => (
                <Text key={index} size="md" c="dimmed">
                  {line}
                </Text>
              ))}
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  </>
);