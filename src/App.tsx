import { useEffect, useState } from "react"
import { UserList } from "./components/UserList/UserList"
import type { User } from "./types/User"

function App() {
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const savedUsers = localStorage.getItem("users")
      if (savedUsers) {
        return JSON.parse(savedUsers)
      }
    } catch (error) {
      const uuid = "c1e293d9-aa42-4727-8c57-a56cafe19acd"
      console.error(uuid, "Error parsing users from localStorage:", error);
    }
    return []
  })

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json()
        const enrichedUsers = data.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          isActive: false,
          clickCount: 0,
        }))
        setUsers(enrichedUsers);
      } catch (error) {
        const uuid = "c1e293d9-aa42-4727-8c57-a56cafe19acd"
        console.error(uuid, "Error fetching users:", error);
      }
    }
    if (!users.length) {
      fetchUsers()
    }
  }, [users])

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users))
  }, [users]);

  const toggleActive = (id: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isActive: !user.isActive } : user
      )
    );
  }

  const incrementClickCount = (id: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, clickCount: user.clickCount + 1 } : user
      )
    );
  }

  const clearUsers = () => {
    localStorage.removeItem("users");
    setUsers([]);
  };

  return (
    <div className="App">
      <h1>User Information</h1>
      <button onClick={clearUsers}>clear</button>
      <UserList users={users} onToggleActive={toggleActive} onIncClickCount={incrementClickCount} />
    </div>
  )
}
export default App
