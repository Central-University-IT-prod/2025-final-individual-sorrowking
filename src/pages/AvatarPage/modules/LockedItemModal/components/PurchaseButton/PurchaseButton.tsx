import { Button } from '@mantine/core';
import { IconCoin } from '@tabler/icons-react';
import { LockedItem } from '../../types';

interface PurchaseButtonProps {
  item: LockedItem | null;
  userCoins: number;
  onBuy: (itemName: string) => void;
  onClose: () => void;
}

export const PurchaseButton = ({ item, userCoins, onBuy, onClose }: PurchaseButtonProps) => {
  if (item?.type !== 'shop') return null;

  const canAfford = userCoins >= (item.value || 0);

  return (
    <Button
      fullWidth
      size="xl"
      radius="md"
      variant="gradient"
      gradient={canAfford ? 
        { from: 'yellow.6', to: 'orange.7' } : 
        { from: 'gray.6', to: 'gray.7' }}
      rightSection={canAfford && <IconCoin size={24} aria-label="монеты"/>}
      onClick={() => {
        onBuy(item.name);
        onClose();
      }}
      disabled={!canAfford}
      styles={{
        label: { fontSize: 'var(--mantine-font-size-lg)' }
      }}
    >
      {canAfford ? `Купить за ${item.value}` : "Не хватает монет"}
    </Button>
  );
};
