import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Users, LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header className="flex justify-between items-center bg-indigo-600 text-white px-6 py-3 shadow-md z-50 w-full">
      {/* Left: Sidebar toggle */}
      <button 
        onClick={() => setSidebarOpen(prev => !prev)}
        className="md:hidden"
      >
        <Users className="w-6 h-6" />
      </button>

      {/* Center: App Name */}
      <h1 className="text-lg font-semibold text-center flex-1">
        ChatterBox
      </h1>

      {/* Right: Logout button as icon */}
      <button
        onClick={logout}
        className="bg-red-500 p-2 rounded hover:bg-red-600 flex items-center justify-center"
        title="Logout"
      >
        <LogOut size={20} />
      </button>
    </header>
  );
}
