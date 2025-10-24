import { Users, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const { logout } = useAuth();

  return (
    <header className="relative flex items-center justify-between bg-indigo-600 text-white px-4 py-3 shadow-md z-50 w-full overflow-hidden">
      {/* Left: Sidebar toggle (mobile only) */}
      <div
        role="button"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden flex items-center justify-center p-2 rounded hover:bg-indigo-500 transition z-10 cursor-pointer"
        title="Toggle Users"
      >
        <Users className="w-6 h-6" />
      </div>

      {/* Center: App Name (always centered even on mobile) */}
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg sm:text-xl font-semibold text-center whitespace-nowrap">
        ChatterBox
      </h1>

      {/* Right: Logout icon */}
      <div
        role="button"
        onClick={logout}
        className="flex-shrink-0 bg-red-500 p-2 rounded hover:bg-red-600 flex items-center justify-center transition z-10 cursor-pointer"
        title="Logout"
      >
        <LogOut size={20} />
      </div>
    </header>
  );
}
