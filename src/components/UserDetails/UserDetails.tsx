import { useParams } from 'react-router-dom';
import { UserCard } from '../UserCard/UserCard';
import type { User } from '../../types/User';

export const UserDetails: React.FC<{ users: User[], onToggleActive: (id: number) => void; onIncClickCount: (id: number) => void }> = ({ users, onToggleActive, onIncClickCount }) => {
  const { id } = useParams<{ id: string }>(); // достаём :id из URL
  const user = users.find(u => u.id === Number(id));

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <UserCard
      user={user}
      onToggleActive={onToggleActive}
      onIncClickCount={onIncClickCount}
    />
  );
};
