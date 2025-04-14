import { Avatar } from '@mantine/core';
import { User } from '@/shared/types/types';

interface UserAvatarProps {
  user: User;
}
const UserAvatar = ({ user }: UserAvatarProps) => (
  <Avatar
    size="xl"
    radius="50%"
    color="blue"
    style={{ border: '3px solid white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
  >
    {user.name[0] || 'U'}
  </Avatar>
);

export default UserAvatar