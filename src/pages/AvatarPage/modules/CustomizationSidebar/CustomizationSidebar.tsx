import { Tabs, Box } from '@mantine/core';
import { useState } from 'react';
import useUserStore from '@/shared/stores/userStore';
import { ItemTabs, ColorTabs, TabHeader } from './components';
import styles from './CustomizationSidebar.module.scss';
import LockedItemModal from '../LockedItemModal';

const CustomizationSidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLockedItem, setSelectedLockedItem] = useState<{
    name: string;
    type: 'shop' | 'level' | 'achievement';
    value?: number;
  } | null>(null);
  
  const { purchaseItem, user } = useUserStore();

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleTransitionEnd = () => {
    if (!isModalOpen) {
      setSelectedLockedItem(null);
    }
  };

  return (
    <>
      <LockedItemModal
        item={selectedLockedItem}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onTransitionEnd={handleTransitionEnd}
        onBuy={purchaseItem}
        userCoins={user.coins}
      />
      <Box className={styles.bottomPanelContainer}>
        <Tabs
          defaultValue="item"
          classNames={{ 
            root: styles.tabsRoot, 
            list: styles.circleTabsList,
            tab: styles.circleTab 
          }}
        >
          <TabHeader />
          <Tabs.Panel value="item">
            <ItemTabs setModalState={{ setIsModalOpen, setSelectedLockedItem }} />
          </Tabs.Panel>
          <Tabs.Panel value="color">
            <ColorTabs />
          </Tabs.Panel>
        </Tabs>
      </Box>
    </>
  );
};

export default CustomizationSidebar;
