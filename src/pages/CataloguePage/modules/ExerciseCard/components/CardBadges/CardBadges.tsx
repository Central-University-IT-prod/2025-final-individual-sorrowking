import { Group, Badge } from '@mantine/core';

interface CardBadgesProps {
  equipment: string[];
  tags: string[];
}

export const CardBadges: React.FC<CardBadgesProps> = ({ equipment, tags }) => (
  <>
    <Group gap="xs" justify="center">
      {equipment.map((item, index) => (
        <Badge
          key={index}
          variant="gradient"
          gradient={{ from: 'orange.6', to: 'red.6' }}
        >
          {item}
        </Badge>
      ))}
    </Group>

    <Group gap="xs" justify="center">
      {tags.map((tag, index) => (
        <Badge
          key={index}
          variant="gradient"
          gradient={{ from: 'indigo.6', to: 'grape.6' }}
        >
          #{tag}
        </Badge>
      ))}
    </Group>
  </>
);