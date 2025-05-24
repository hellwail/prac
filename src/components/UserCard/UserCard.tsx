import type{ User } from '../../types/User';

interface UserCardProps {
    user: User;
    onToggleActive: (id: string) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onToggleActive }) => {
    return (
        <div className="user-card">
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Age: {user.age}</p>
            <p>Status: {user.isActive ? 'Active' : 'Inactive'}</p>
            <button onClick={() => onToggleActive(user.id)}>
                {user.isActive ? 'Inactive' : 'Activate'}
            </button>
        </div>
    );
}