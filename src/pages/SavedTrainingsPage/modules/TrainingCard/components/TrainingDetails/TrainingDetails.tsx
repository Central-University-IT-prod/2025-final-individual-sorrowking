import { Stack, Text } from '@mantine/core';

export const TrainingDetails = ({ description }: { description?: string }) => {
  if (!description) return null;

  return (
    <Stack gap="md" my="md" pt="md" style={{ borderTop: '1px solid #f1f5f9' }}>
      <Text size="sm" c="dimmed" px="md">
        {description}
      </Text>
    </Stack>
  );
};
