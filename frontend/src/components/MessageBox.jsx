import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import socket from "../utils/socket.js";

export default function MessageBox({ selectedUser }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    if (!selectedUser || !user?._id) return;

    const roomId = [user._id, selectedUser._id].sort().join("_");

    // Clear messages when switching user
    setMessages([]);

    // Join socket room
    socket.emit("joinRoom", roomId);

    // Listen for incoming messages
    const handleReceive = (msg) => {
      if (msg.roomId === roomId) {
        setMessages((prev) => {
          // Prevent duplicates if message already exists
          if (prev.some((m) => m._id === msg._id)) return prev;
          return [...prev, msg];
        });
      }
    };

    socket.on("receiveMessage", handleReceive);

    return () => {
      socket.emit("leaveRoom", roomId);
      socket.off("receiveMessage", handleReceive);
    };
  }, [selectedUser, user]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="space-y-2 text-gray-800 flex flex-col p-2">
      {messages.map((msg, i) => (
        <div
          key={msg._id || i}
          ref={scrollRef}
          className={`p-2 rounded-lg max-w-xs ${
            msg.sender === user._id
              ? "bg-indigo-100 self-end ml-auto"
              : "bg-gray-100 self-start"
          }`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
}
