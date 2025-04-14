import { Button, Paper, Flex, ActionIcon } from '@mantine/core';
import { IconTrash, IconArrowsMove, IconSettings } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import styles from './ModeSidebar.module.scss';
import cx from 'classnames';

interface ModeSidebarProps {
  mode: 'delete' | 'arrange' | 'edit';
  handleModeChange: (mode: 'delete' | 'arrange' | 'edit') => void;
}

const modeConfig = {
  delete: {
    icon: IconTrash,
    label: 'Удаление',
    ariaLabel: 'Удаление'
  },
  arrange: {
    icon: IconArrowsMove,
    label: 'Расстановка',
    ariaLabel: 'Расстановка'
  },
  edit: {
    icon: IconSettings,
    label: 'Редактирование',
    ariaLabel: 'Редактирование'
  }
} as const;

export const ModeSidebar: React.FC<ModeSidebarProps> = ({ mode, handleModeChange }) => {
  const isMobile = useMediaQuery('(max-width: 800px)');
  const modes = ['delete', 'arrange', 'edit'] as const;

  return (
    <Paper p={8} radius="md" shadow="sm" withBorder style={{ backgroundColor: 'transparent' }}>
      <Flex className={styles.tabsContainer}>
        {modes.map((buttonMode) => {
          const isActive = mode === buttonMode;
          const Icon = modeConfig[buttonMode].icon;
          const buttonClassName = cx(
            styles.modeButton,
            styles[`modeButton--${buttonMode}`],
            { [styles.active]: isActive }
          );

          return isMobile ? (
            <ActionIcon
              key={buttonMode}
              variant="subtle"
              onClick={() => handleModeChange(buttonMode)}
              size="xl"
              radius="sm"
              aria-label={modeConfig[buttonMode].ariaLabel}
              className={buttonClassName}
              
            >
              <Icon size={20} />
            </ActionIcon>
          ) : (
            <Button
              key={buttonMode}
              variant="subtle"
              onClick={() => handleModeChange(buttonMode)}
              size="md"
              radius="sm"
              leftSection={<Icon size={18} />}
              className={cx(styles.tab, buttonClassName)}
            >
              {modeConfig[buttonMode].label}
            </Button>
          );
        })}
      </Flex>
    </Paper>
  );
};