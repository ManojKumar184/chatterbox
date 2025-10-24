import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import socket from "../utils/socket.js";

export default function MessageInput({ selectedUser }) {
  const { user } = useAuth();
  const [text, setText] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim() || !user?._id || !selectedUser?._id) return;

    const roomId = [user._id, selectedUser._id].sort().join("_");

    const newMsg = {
      sender: user._id,
      text,
      roomId,
      receiver: selectedUser._id,
    };

    // Emit via socket only
    socket.emit("sendMessage", newMsg);

    setText(""); // clear input
  };

  return (
    <form onSubmit={handleSend} className="flex border-t p-3 bg-white">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="text-gray-800 flex-1 border rounded-l-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
      />
      <div
        role="submit"
        className="bg-indigo-600 text-white px-5 py-2 rounded-r-lg hover:bg-indigo-700"
      >
        Send
      </div>
    </form>
  );
}
