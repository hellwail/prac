import { useEffect, useState } from "react"
import { Routes, Route, Link } from 'react-router-dom';
import UserList from './pages/UserList/UserList';
import {UserDetails} from './components/UserDetails/UserDetails';
import {About} from './pages/About/About';
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
    <div>
      <nav>
        <Link to="/">Users</Link> | <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<UserList users={users} clearUsers={clearUsers} />} />
        <Route
          path="/users/:id"
          element={
            <UserDetails
              users={users}
              onToggleActive={toggleActive}
              onIncClickCount={incrementClickCount}
            />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}
export default App
