import type{ User } from '../../types/User';

interface UserCardProps {
    user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
    return (
        <div className="user-card">
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Age: {user.age}</p>
            <p>Status: {user.isActive ? 'Active' : 'Inactive'}</p>
        </div>
    );
}