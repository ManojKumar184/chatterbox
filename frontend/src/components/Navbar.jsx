import { Users, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const { logout } = useAuth();

  return (
    <header className="flex justify-between items-center bg-indigo-600 text-white px-4 py-3 shadow-md z-50 w-full">
      {/* Left: Sidebar toggle (mobile only) */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden flex items-center justify-center p-2 rounded hover:bg-indigo-500 transition"
        title="Toggle Users"
      >
        <Users className="w-6 h-6" />
      </button>

      {/* Center: App Name */}
      <h1 className="text-lg md:text-xl font-semibold text-center flex-1 md:flex-none">
        ChatterBox
      </h1>

      {/* Right: Logout button as icon */}
      <button
        onClick={logout}
        className="flex-shrink-0 bg-red-500 p-2 rounded hover:bg-red-600 flex items-center justify-center transition ml-2 md:ml-0"
        title="Logout"
      >
        <LogOut size={20} />
      </button>
    </header>
  );
}
