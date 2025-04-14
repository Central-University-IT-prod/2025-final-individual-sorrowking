import { Tabs } from '@mantine/core';
import { ColorCard } from '@/pages/AvatarPage/components';
import { CUSTOMIZATION_COLOR_GROUPS } from '@/shared/constants/userCharacter';
import useUserStore from '@/shared/stores/userStore';
import styles from '../Tabs.module.scss'
import { UserAvatar } from '@/shared/types/types';

export const ColorTabs = () => {
  const { user, updateAvatar } = useUserStore();

  const handleColorClick = (type: keyof UserAvatar, color: string) => {
    updateAvatar({ [type]: color });
  };

  return (
    <Tabs
      defaultValue={CUSTOMIZATION_COLOR_GROUPS[0].title}
      classNames={{ 
        root: styles.tabsRoot, 
        list: styles.tabsList, 
        tab: styles.tab 
      }}
    >
      <Tabs.List>
        {CUSTOMIZATION_COLOR_GROUPS.map((group) => (
          <Tabs.Tab
            key={group.title}
            value={group.title}
            className={styles.tabItem}
          >
            {group.title}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {CUSTOMIZATION_COLOR_GROUPS.map((group) => (
        <Tabs.Panel key={group.title} value={group.title} className={styles.panel}>
          <div className={styles.horizontalScroll}>
            {group.colors.map((color) => {
              const isSelected = user.avatar[group.type] === color;
              return (
                <ColorCard
                  key={color}
                  color={color}
                  onClick={() => handleColorClick(group.type as keyof UserAvatar, color)}
                  isSelected={isSelected}
                />
              );
            })}
          </div>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};
