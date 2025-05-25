import { Link } from 'react-router-dom';
import type { User } from '../../types/User';
import { useUserStore } from '../../store/userStore';

interface UserListProps {
  users: User[];
  // clearUsers: () => void;
}

export default function UserList({ users}: UserListProps) {
  const clearUsers = useUserStore((state) => state.clearUsers);
  return (
    <div>
      <h1>Users</h1>
      <button onClick={clearUsers}>Clear</button>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>
              {user.name} ({user.email})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}