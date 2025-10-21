import { useEffect, useState } from "react";
import { getUsers } from "../utils/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function ChatList({ onSelectUser, selectedUser }) {
  const { user } = useAuth(); // flattened user now has _id directly
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!user?.token || !user?._id) return; // updated

    const fetchUsers = async () => {
      const allUsers = await getUsers(user.token);
      if (!Array.isArray(allUsers)) return;

      // filter out current user
      setUsers(allUsers.filter((u) => u._id !== user._id));
    };
    fetchUsers();
  }, [user]);

  return (
    <aside className="hidden md:block bg-white border-r w-1/4 lg:w-1/5 shadow-sm">
      <div className="p-4 border-b text-indigo-600 font-semibold">Users</div>
      <ul className="p-2 space-y-2">
        {users.map((u) => (
          <li
            key={u._id}
            onClick={() => onSelectUser(u)}
            className={`p-2 text-gray-800 rounded-lg hover:bg-indigo-300 cursor-pointer flex items-center gap-2 ${
              selectedUser?._id === u._id ? "bg-indigo-100" : ""
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-gray-300" />
            <span className="font-medium">{u.username}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
