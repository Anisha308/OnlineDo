import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
  {
    members: {
      type: Array,
    },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "message" }],

    lastMessageTime: {
      type: Date,
    },
  },

  {
    timestamps: true,
  }
);

const Chat = mongoose.model("chat", chatSchema);
export default Chat;
