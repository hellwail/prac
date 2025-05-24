import { UserCard } from "./components/UserCard/UserCard"
import type { User } from "./types/User"
import { useEffect, useState } from "react"

function App() {

  const [users, setUsers] = useState<User[]>(()=> {
    try{
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
      }
      catch (error) {
        const uuid = "c1e293d9-aa42-4727-8c57-a56cafe19acd"
        console.error(uuid, "Error fetching users:", error);
      }
    }
    if(!users.length){
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
    );}

    const incrementClickCount = (id: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, clickCount: user.clickCount + 1} : user
      )
    );}

    const clearUsers = () => {
      localStorage.removeItem("users");
      setUsers([
        // { id: '1', name: 'John Doe', email: "some@mail.ru", isActive: true, clickCount: 0 },
        // { id: '2', name: 'Jane Smith', email: "email@email.com", isActive: false, clickCount: 0 },
      ]);
    };
    
  return (
    <>
      <div className="App">
        <h1>User Information</h1>
        <button onClick={clearUsers}>clear</button>
        {users.map((user) =>(
          <UserCard key={user.id} user={user} onToggleActive={toggleActive} onIncClickCount={incrementClickCount} />
        ))}
      </div>
    </>
  )
}
export default App
