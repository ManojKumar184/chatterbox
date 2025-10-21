import { useState } from "react";
import ChatList from "../components/ChatList.jsx";
import MessageBox from "../components/MessageBox.jsx";
import MessageInput from "../components/MessageInput.jsx";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Chat() {
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100 relative">
      {/* Navbar always visible */}
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for desktop */}
        <div className="hidden md:block w-64 border-r bg-white">
          <ChatList
            onSelectUser={(u) => {
              setSelectedUser(u);
              setSidebarOpen(false);
            }}
            selectedUser={selectedUser}
          />
        </div>

        {/* Sidebar overlay for mobile */}
        <div
          className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Background overlay (click to close) */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setSidebarOpen(false)}
          ></div>

          {/* Sidebar panel */}
          <div className="relative bg-white w-64 h-full shadow-lg">
            <ChatList
              onSelectUser={(u) => {
                setSelectedUser(u);
                setSidebarOpen(false);
              }}
              selectedUser={selectedUser}
            />
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {selectedUser ? (
            <>
              <div className="bg-white shadow p-4 font-semibold text-indigo-600 border-b">
                Chatting with {selectedUser.username}
              </div>
              <div className="flex-1 flex flex-col overflow-y-auto">
                <MessageBox selectedUser={selectedUser} />
              </div>
              <MessageInput selectedUser={selectedUser} />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a user to start chatting 💬
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
