import { useEffect} from "react"
import { Routes, Route, Link } from 'react-router-dom';
import UserList from './pages/UserList/UserList';
import {UserDetails} from './components/UserDetails/UserDetails';
import {About} from './pages/About/About';
// import type { User } from "./types/User"
import { useUserStore } from "./store/userStore";

function App() {
  const users = useUserStore((state) => state.users);
  const setUsers = useUserStore((state) => state.setUsers);
  // const toggleActive = useUserStore((state) => state.toggleActive);
  // const incrementClickCount = useUserStore((state) => state.incrementClickCount);
  // const clearUsers = useUserStore((state) => state.clearUsers);
  // const [users, setUsers] = useState<User[]>(() => {
  //   try {
  //     const savedUsers = localStorage.getItem("users")
  //     if (savedUsers) {
  //       return JSON.parse(savedUsers)
  //     }
  //   } catch (error) {
  //     const uuid = "c1e293d9-aa42-4727-8c57-a56cafe19acd"
  //     console.error(uuid, "Error parsing users from localStorage:", error);
  //   }
  //   return []
  // })

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
        console.log("Loading users from localStorage");
        setUsers(JSON.parse(savedUsers));
    } else {
        console.log("Fetching users from API");
        const fetchUsers = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                const data = await response.json();
                const enrichedUsers = data.map((user: any) => ({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    isActive: false,
                    clickCount: 0,
                }));
                setUsers(enrichedUsers);
                localStorage.setItem("users", JSON.stringify(enrichedUsers));
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }
}, []);

useEffect(() => {
    if (users.length > 0) {
        localStorage.setItem("users", JSON.stringify(users));
        console.log("Updated localStorage with users");
    }
}, [users]);

  // const toggleActive = (id: number) => {
  //   setUsers((prevUsers) =>
  //     prevUsers.map((user) =>
  //       user.id === id ? { ...user, isActive: !user.isActive } : user
  //     )
  //   );
  // }

  // const incrementClickCount = (id: number) => {
  //   setUsers((prevUsers) =>
  //     prevUsers.map((user) =>
  //       user.id === id ? { ...user, clickCount: user.clickCount + 1 } : user
  //     )
  //   );
  // }

  // const clearUsers = () => {
  //   localStorage.removeItem("users");
  //   setUsers([]);
  // };

  return (
    <div>
      <nav>
        <Link to="/">Users</Link> | <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<UserList users={users} />} />
        <Route
          path="/users/:id"
          element={
            <UserDetails
              users={users}
              // onToggleActive={toggleActive}
              // onIncClickCount={incrementClickCount}
            />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}
export default App
