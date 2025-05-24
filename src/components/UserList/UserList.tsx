import { UserCard } from "../UserCard/UserCard"
import type { User } from "../../types/User"

interface UserListProps {
  users: User[]
  onToggleActive: (id: number) => void
  onIncClickCount: (id: number) => void
}

export function UserList({ users, onToggleActive, onIncClickCount }: UserListProps) {
  return (
    <>
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onToggleActive={onToggleActive}
          onIncClickCount={onIncClickCount}
        />
      ))}
    </>
  )
}