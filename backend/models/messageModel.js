import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    sender: { type: String, required: true }, // changed from 'user'
    text: { type: String, required: true },   // changed from 'message'
    roomId: { type: String, required: true }  // to store room ID for socket
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
