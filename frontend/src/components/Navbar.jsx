import { Users, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const { user, logout } = useAuth();

  return (
    <header className="flex justify-between items-center bg-indigo-600 text-white px-6 py-3 shadow-md z-50 w-full">
      {/* Left: Sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
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
