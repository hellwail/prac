import type{ User } from '../../types/User';
import { useUserStore } from '../../store/userStore';

interface UserCardProps {
    user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const toggleActive = useUserStore((state) => state.toggleActive);
    const incrementClickCount = useUserStore((state) => state.incrementClickCount);
    
    return (
        <div className="user-card">
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Status: {user.isActive ? 'Active' : 'Inactive'}</p>
            <p>Times clicked: {user.clickCount}</p>
            <button onClick={() => toggleActive(user.id)}>
                {user.isActive ? 'Inactive' : 'Activate'}
            </button>
            <button onClick={() => incrementClickCount(user.id)}>Click for count</button>
        </div>
    );
}