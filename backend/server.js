import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import messageRoutes from "./routes/messageRoutes.js";
import Message from "./models/messageModel.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/messages", messageRoutes);
app.use("/api/auth", authRoutes);

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chatterbox-zeta-blue.vercel.app/", // React frontend URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", async (data) => {
    // Validate required fields
    if (!data.sender || !data.text || !data.roomId) {
      console.error("Invalid message data:", data);
      return;
    }

    try {
      console.log("Message received from frontend:", data);
      const message = await Message.create(data);
      io.emit("receiveMessage", message); // broadcast message
    } catch (err) {
      console.error("Error saving message:", err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
