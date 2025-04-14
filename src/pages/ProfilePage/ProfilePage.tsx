import { useState } from 'react';
import useUserStore from '@/shared/stores/userStore';
import { User } from '@/shared/types/types';
import { Paper, Title, Tabs, Flex, Group } from '@mantine/core';
import { IconUser, IconPencil, IconTrophy, IconChartBar } from '@tabler/icons-react';
import { UserAvatar, AchievementCard  } from './components';
import { UserData, EditProfileForm, Statistics} from './modules'
import { ACHIEVEMENT_DATA } from '@/shared/constants/userProgression';
import styles from './ProfilePage.module.scss';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, updateUser, updateCoins, addExperience, resetUser } = useUserStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'stats' | 'edit' | 'achievements'>('profile');
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleFieldChange = (field: keyof User, value: string | number) => {
    setEditedUser(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateUser(editedUser);
    setActiveTab('profile');
  };

  const handleSetCoins = () => {
    updateCoins(1000);
  }

  const handleResetUser = () => {
    resetUser();
    navigate('/catalogue')
  }

  const handleAddExperience = () => {
    addExperience(1000);
  }

  return (
    <div className={styles.profile}>
      <Paper p="md" shadow="sm" radius="md" className={styles.profile__card}>
        <Flex direction="column" gap="md">
          <Group justify="center">
            <UserAvatar user={user} />
          </Group>

          <Tabs 
            value={activeTab} 
            onChange={(value) => setActiveTab(value as typeof activeTab)}
            className={styles.tabs}
          >
            <Tabs.List grow>
              <Tabs.Tab 
                value="profile" 
                leftSection={<IconUser size={18} aria-label="профиль"/>}
                aria-label="профиль"
              >
              </Tabs.Tab>
              <Tabs.Tab 
                value="edit" 
                leftSection={<IconPencil size={18} aria-label="редактировать"/>}
                aria-label="редактировать профиль"
              >
              </Tabs.Tab>
              <Tabs.Tab 
                value="stats" 
                leftSection={<IconChartBar size={18} aria-label="статистика"/>}
                aria-label="посмотреть статистику"
              >
              </Tabs.Tab>

              <Tabs.Tab 
                value="achievements" 
                leftSection={<IconTrophy size={18} aria-label="достижения"/>}
                aria-label="посмотреть достижения"
              >
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="profile" pt="1rem">
              <Title order={2} className={styles.userName}>
                {user.name}
              </Title>
              <UserData 
                user={user}
                onSetCoins={handleSetCoins}
                onResetUser={handleResetUser}
                onAddExperience={handleAddExperience}
              />
            </Tabs.Panel>

            <Tabs.Panel value="edit" pt="1rem">
              <EditProfileForm
                editedUser={editedUser}
                onFieldChange={handleFieldChange}
                onSave={handleSave}
              />
            </Tabs.Panel>
            
            <Tabs.Panel value="stats" pt="1rem">
              <Statistics />
            </Tabs.Panel>


            <Tabs.Panel value="achievements" pt="1rem">
              <div className={styles.achievementsSection}>
                {Object.entries(ACHIEVEMENT_DATA).map(([achievementId, achievement]) => {
                  const id = Number(achievementId);
                  return (
                    <AchievementCard 
                      key={id} 
                      achievementId={id}
                      achievement={achievement} 
                    />
                  );
                })}
              </div>
          </Tabs.Panel>
          </Tabs>
        </Flex>
      </Paper>
    </div>
  );
};

export default ProfilePage;