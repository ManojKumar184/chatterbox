import express from "express";
import Message from "../models/messageModel.js";

const router = express.Router();

// Get all messages for a room
router.get("/:roomId", async (req, res) => {
  const { roomId } = req.params;
  const messages = await Message.find({ roomId }).sort({ createdAt: 1 });
  res.json(messages);
});

// Post a message
router.post("/", async (req, res) => {
  const { sender, text, roomId } = req.body;
  const newMessage = new Message({ sender, text, roomId });
  await newMessage.save();
  res.status(201).json(newMessage);
});

export default router;
