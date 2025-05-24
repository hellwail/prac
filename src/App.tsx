import { UserCard } from "./components/UserCard/UserCard"
import type { User } from "./types/User"

function App() {

  const mockUsers: User[] = [
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
  ]
  return (
    <>
      <div className="App">
        <h1>User Information</h1>
        {mockUsers.map((user) =>(
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </>
  )
}

export default App
