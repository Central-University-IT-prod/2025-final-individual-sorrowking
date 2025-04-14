export interface LockedItem {
  name: string;
  type?: 'shop' | 'level' | 'achievement';
  value?: number;
}

export interface LockedItemModalProps {
  item: LockedItem | null;
  isOpen: boolean;
  onClose: () => void;
  onTransitionEnd: () => void;
  onBuy?: (itemName: string) => void;
  userCoins?: number;
}