import { Users, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const { logout } = useAuth();

  return (
    <header className="relative flex items-center justify-between bg-indigo-700 text-white px-4 py-3 shadow-md z-50 w-full overflow-hidden">
      {/* Left: Sidebar toggle (mobile only) */}
      <div
        role="button"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden flex items-center justify-center p-2 rounded bg-indigo-800 hover:bg-indigo-900 transition z-10 cursor-pointer"
        title="Toggle Users"
      >
        <Users className="w-6 h-6 text-gray-100" />
      </div>

      {/* Center: App Name (responsive text size) */}
      <h3 className="absolute left-1/2 transform -translate-x-1/2 font-semibold text-center whitespace-nowrap text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide">
        ChatterBox
      </h3>

      {/* Right: Logout icon */}
      <div
        role="button"
        onClick={logout}
        className="flex-shrink-0 bg-indigo-800 p-2 rounded hover:bg-red-700 flex items-center justify-center transition z-10 cursor-pointer"
        title="Logout"
      >
        <LogOut size={22} className="text-gray-100" />
      </div>
    </header>
  );
}
