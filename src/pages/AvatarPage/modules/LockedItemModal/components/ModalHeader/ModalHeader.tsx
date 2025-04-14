import { Group, Text } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';
import { CUSTOMIZATION_ITEM_NAMES } from '@/shared/constants/userCharacter';
import { LockedItem } from '../../types';

interface ModalHeaderProps {
  item: LockedItem | null;
}

export const ModalHeader = ({ item }: ModalHeaderProps) => (
  <Group gap="sm">
    <IconLock size={24} stroke={2.5} aria-label="заблокировано" />
    <Text fz="xl" fw={700} tt="uppercase">
      {item?.name && item.name in CUSTOMIZATION_ITEM_NAMES 
        ? CUSTOMIZATION_ITEM_NAMES[item.name as keyof typeof CUSTOMIZATION_ITEM_NAMES]
        : 'Заблокированный предмет'}
    </Text>
  </Group>
);
