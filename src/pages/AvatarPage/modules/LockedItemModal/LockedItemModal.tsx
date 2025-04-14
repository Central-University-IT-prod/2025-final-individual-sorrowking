import { Modal, Stack } from '@mantine/core';
import { LockedItemModalProps } from './types';
import { ModalHeader, ItemPreview, PurchaseButton, UnlockCondition, UserBalance} from './components'
const LockedItemModal = ({ 
  item,
  isOpen,
  onClose, 
  onBuy, 
  onTransitionEnd,
  userCoins = 0 
}: LockedItemModalProps) => {
  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={<ModalHeader item={item} />}
      size="lg"
      padding="xl"
      radius="md"
      onTransitionEnd={onTransitionEnd}
      transitionProps={{ duration: 300, transition: 'pop' }}
      overlayProps={{ backgroundOpacity: 0.7, blur: 4 }}
    >
      <Stack gap="xl">
        <ItemPreview item={item} />
        
        {item?.type !== 'shop' ? (
          <UnlockCondition item={item} />
        ) : (
          <UserBalance userCoins={userCoins} />
        )}

        <PurchaseButton
          item={item}
          userCoins={userCoins}
          onBuy={onBuy!}
          onClose={onClose}
        />
      </Stack>
    </Modal>
  );
};

export default LockedItemModal;