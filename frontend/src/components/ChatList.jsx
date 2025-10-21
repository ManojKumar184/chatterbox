import { useEffect, useState } from "react";
import { getUsers } from "../utils/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function ChatList({ onSelectUser, selectedUser }) {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!user?.token || !user?._id) return;

    const fetchUsers = async () => {
      try {
        const allUsers = await getUsers(user.token);
        if (Array.isArray(allUsers)) {
          setUsers(allUsers.filter((u) => u._id !== user._id));
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, [user]);

  return (
    <aside className="bg-white border-r w-64 h-full shadow-sm overflow-y-auto">
      <div className="p-4 border-b text-indigo-600 font-semibold text-lg">
        Users
      </div>
      <ul className="p-2 space-y-2">
        {users.length > 0 ? (
          users.map((u) => (
            <li
              key={u._id}
              onClick={() => onSelectUser(u)}
              className={`p-2 text-gray-800 rounded-lg hover:bg-indigo-300 cursor-pointer flex items-center gap-3 ${
                selectedUser?._id === u._id ? "bg-indigo-100" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold">
                {u.username.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium truncate">{u.username}</span>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500 py-4">No users found</li>
        )}
      </ul>
    </aside>
  );
}
