import { Paper, Image, Badge } from '@mantine/core';
import { LockedItem } from '../../types';

interface ItemPreviewProps {
  item: LockedItem | null;
}

export const ItemPreview = ({ item }: ItemPreviewProps) => (
  <Paper
    p="sm"
    radius="lg"
    shadow="xl"
    style={{
      border: '2px solid var(--mantine-color-yellow-7)',
      position: 'relative',
    }}
  >
    <Image
      src={`/assets/glbPreviews/${item?.name}.png`}
      alt={item?.name}
      radius="md"
      height={240}
      style={{ objectFit: 'contain' }}
    />
    <Badge
      variant="gradient"
      gradient={{ from: 'yellow.7', to: 'orange.7' }}
      size="lg"
      radius="sm"
      style={{ position: 'absolute', top: -15, right: -15, zIndex: 1000 }}
    >
      NEW
    </Badge>
  </Paper>
);
