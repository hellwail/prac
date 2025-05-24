import type{ User } from '../../types/User';

interface UserCardProps {
    user: User;
    onToggleActive: (id: number) => void;
    onIncClickCount: (id: number) => void; 
}

export const UserCard: React.FC<UserCardProps> = ({ user, onToggleActive, onIncClickCount }) => {
    return (
        <div className="user-card">
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Status: {user.isActive ? 'Active' : 'Inactive'}</p>
            <p>Times clicked: {user.clickCount}</p>
            <button onClick={() => onToggleActive(user.id)}>
                {user.isActive ? 'Inactive' : 'Activate'}
            </button>
            <button onClick={() => onIncClickCount(user.id)}>Click for count</button>
        </div>
    );
}