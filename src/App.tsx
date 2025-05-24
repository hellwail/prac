import { UserCard } from "./components/UserCard/UserCard"
import type { User } from "./types/User"
import { useEffect, useState } from "react"

function App() {

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "some@mail.ru",
      age: 30,
      isActive: true
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "email@email.com",
      age: 25,
      isActive: false
    },
  ])

  useEffect(() => {
    console.log('Users updated:', users);
  }, [users]);

  const toggleActive = (id: string) => {
    setUsers((prevUsers) => 
      prevUsers.map((user) =>
        user.id === id ? { ...user, isActive: !user.isActive } : user
      )
    );}
  return (
    <>
      <div className="App">
        <h1>User Information</h1>
        {users.map((user) =>(
          <UserCard key={user.id} user={user} onToggleActive={toggleActive} />
        ))}
      </div>
    </>
  )
}
export default App
