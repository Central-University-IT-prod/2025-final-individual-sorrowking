import { Paper, Text, Flex, ThemeIcon, ActionIcon, Tooltip } from '@mantine/core';
import { IconVenus, IconMars, IconWeight, IconRuler, IconCalendar, IconCoin, IconReload, IconCoins, IconStars } from '@tabler/icons-react';
import { User } from '@/shared/types/types';
import styles from './UserData.module.scss';

interface UserDataProps {
  user: User;
  onSetCoins: () => void;
  onResetUser: () => void
  onAddExperience: () => void;
}

const UserData = ({ user, onSetCoins, onResetUser, onAddExperience }: UserDataProps) => (
  <Flex direction="column" gap="md" className={styles.userData}>
    <Paper withBorder radius="md" p="md" className={styles.userData__card}>
      <Flex align="center" gap="sm">
        
        <ThemeIcon variant="light" size="lg" color={user.gender === 'male' ? 'blue' : 'pink'}>
          {user.gender === 'male' ? <IconMars size={20} area-label="мужской"/> : <IconVenus size={20} area-label="женский"/>}
        </ThemeIcon>
        <div>
          <Text fz="sm" c="dimmed">Пол</Text>
          <Text fw={600}>{user.gender === 'male' ? 'Мужской' : 'Женский'}</Text>
        </div>
      </Flex>
    </Paper>

    <Paper withBorder radius="md" p="md" className={styles.userData__card}>
      <Flex align="center" gap="sm">
        <ThemeIcon variant="light" size="lg" color="violet">
          <IconWeight size={20} area-label="вес"/>
        </ThemeIcon>
        <div>
          <Text fz="sm" c="dimmed">Вес</Text>
          <Text fw={600}>{user.weight} кг</Text>
        </div>
      </Flex>
    </Paper>

    <Paper withBorder radius="md" p="md" className={styles.userData__card}>
      <Flex align="center" gap="sm">
        <ThemeIcon variant="light" size="lg" color="green">
          <IconRuler size={20} area-label="рост"/>
        </ThemeIcon>
        <div>
          <Text fz="sm" c="dimmed">Рост</Text>
          <Text fw={600}>{user.height} см</Text>
        </div>
      </Flex>
    </Paper>

    <Paper withBorder radius="md" p="md" className={styles.userData__card}>
      <Flex align="center" gap="sm">
        <ThemeIcon variant="light" size="lg" color="orange">
          <IconCalendar size={20} area-label="возраст"/>
        </ThemeIcon>
        <div>
          <Text fz="sm" c="dimmed">Возраст</Text>
          <Text fw={600}>{user.age} лет</Text>
        </div>
      </Flex>
    </Paper>

    <Paper withBorder radius="md" p="md" className={styles.userData__card}>
      <Flex align="center" gap="sm">
        <ThemeIcon variant="light" size="lg" color="yellow">
          <IconCoin size={20} area-label="монеты"/>
        </ThemeIcon>
        <div>
          <Text fz="sm" c="dimmed">Монеты</Text>
          <Text fw={600}>{user.coins}</Text>
        </div>
      </Flex>
    </Paper>

    <Flex gap="sm" justify="flex-end" mt="sm">
      <Tooltip label="Сбросить юзера" position="bottom">
        <ActionIcon 
          variant="light" 
          color="orange" 
          size="lg"
          onClick={onResetUser}
        >
          <IconReload size={20} area-label="чит"/>
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Прибавить 1000 монет" position="bottom">
        <ActionIcon 
          variant="light" 
          color="teal" 
          size="lg"
          onClick={onSetCoins}
        >
          <IconCoins size={20} area-label="чит" />
        </ActionIcon>
      </Tooltip>
      
      <Tooltip label="Добавить опыта" position="bottom">
        <ActionIcon 
          variant="light" 
          color="yellow" 
          size="lg"
          onClick={onAddExperience}
        >
          <IconStars size={20} area-label="Добавить опыта"/>
        </ActionIcon>
      </Tooltip>

    </Flex>
  </Flex>
);

export default UserData;