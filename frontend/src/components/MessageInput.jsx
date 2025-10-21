import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { sendMessage as apiSendMessage } from "../utils/api.js";
import socket from "../utils/socket.js";

export default function MessageInput({ selectedUser }) {
  const { user } = useAuth(); // now user._id exists
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("Rendering MessageInput for:", { user, selectedUser });
  }, [user, selectedUser]);

  const handleSend = async (e) => {
    e.preventDefault();
    console.log("handleSend triggered");

    if (!text.trim() || !user || !user._id || !selectedUser || !selectedUser._id) {
      console.log("Blocked send — missing data:", { text, user, selectedUser });
      return;
    }

    const roomId = [user._id, selectedUser._id].sort().join("_");

    const newMsg = {
      sender: user._id,
      text,
      roomId,
      receiver: selectedUser._id,
    };

    // Emit via socket for real-time
    console.log("Emitting socket message:", newMsg);
    socket.emit("sendMessage", newMsg);

    // Save to backend
    const savedMsg = await apiSendMessage(newMsg, user.token);
    console.log("Message saved to backend:", savedMsg);

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
      <button type="submit" className="bg-indigo-600 text-white px-5 py-2 rounded-r-lg hover:bg-indigo-700">
        Send
      </button>
    </form>
  );
}
