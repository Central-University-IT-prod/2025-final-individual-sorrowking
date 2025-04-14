import { Tabs } from '@mantine/core';
import { ImageCard } from '@/pages/AvatarPage/components';
import { CUSTOMIZATION_ITEM_GROUPS } from '@/shared/constants/userCharacter';
import { SHOP_UNLOCKS } from '@/shared/constants/userProgression';
import useUserStore from '@/shared/stores/userStore';
import styles from '../Tabs.module.scss'
import { UserAvatar } from '@/shared/types/types';

interface ItemTabsProps {
  setModalState: {
    setIsModalOpen: (value: boolean) => void;
    setSelectedLockedItem: (value: {
      name: string;
      type: 'shop' | 'level' | 'achievement';
      value?: number;
    } | null) => void;
  };
}

export const ItemTabs = ({ setModalState: { setIsModalOpen, setSelectedLockedItem } }: ItemTabsProps) => {
  const { user, updateAvatar } = useUserStore();

  const handleItemClick = (type: keyof UserAvatar, item: string | null) => {
    updateAvatar({ [type]: item || undefined });
  };

  return (
    <Tabs
      defaultValue={CUSTOMIZATION_ITEM_GROUPS[0].title}
      classNames={{ 
        root: styles.tabsRoot, 
        list: styles.tabsList, 
        tab: styles.tab 
      }}
    >
      <Tabs.List>
        {CUSTOMIZATION_ITEM_GROUPS.map((group) => (
          <Tabs.Tab
            key={group.title}
            value={group.title}
            className={styles.tabItem}
          >
            {group.title}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {CUSTOMIZATION_ITEM_GROUPS.map((group) => (
        <Tabs.Panel key={group.title} value={group.title} className={styles.panel}>
          <div className={styles.horizontalScroll}>
            {group.optional && (
              <ImageCard
                key={`${group.type}-remove`}
                isRemove={true}
                isSelected={!user.avatar[group.type]}
                onClick={() => handleItemClick(group.type as keyof UserAvatar, null)}
              />
            )}
            
            {group.items.map((item) => {
              const isSelected = user.avatar[group.type] === item;
              const lockedItem = user.avatar.lockedItems.find(li => li.name === item);
              
              let unlockType: 'shop' | 'level' | 'achievement';
              let unlockValue: number | undefined;

              if (lockedItem) {
                if (lockedItem.requirement === 'shop') {
                  unlockType = 'shop';
                  unlockValue = SHOP_UNLOCKS[item];
                } else if (lockedItem.requirement.startsWith('level_')) {
                  unlockType = 'level';
                  unlockValue = parseInt(lockedItem.requirement.split('_')[1], 10);
                } else if (lockedItem.requirement.startsWith('achievement_')) {
                  unlockType = 'achievement';
                  unlockValue = parseInt(lockedItem.requirement.split('_')[1], 10);
                }
              }

              return (
                <ImageCard
                  key={item}
                  item={item}
                  isSelected={isSelected}
                  locked={!!lockedItem}
                  unlockType={unlockType}
                  unlockValue={unlockValue}
                  onLockClick={() => {
                    setSelectedLockedItem({
                      name: item,
                      type: unlockType,
                      value: unlockValue,
                    });
                    setIsModalOpen(true);
                  }}
                  onClick={() => handleItemClick(group.type as keyof UserAvatar, item)}
                />
              );
            })}
          </div>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};
