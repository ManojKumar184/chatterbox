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
    <div className="flex flex-col h-screen w-screen bg-gray-100">
      {/* Navbar always visible */}
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <ChatList
          onSelectUser={(u) => {
            setSelectedUser(u);
            setSidebarOpen(false); // close sidebar on mobile
          }}
          selectedUser={selectedUser}
          className={`bg-white border-r w-64 md:block fixed md:relative top-0 left-0 h-full z-40 transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        />

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
