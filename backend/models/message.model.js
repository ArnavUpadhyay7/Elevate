const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderType: {
      type: String,
      enum: ["player", "coach"],
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "senderType",
    },

    receiverType: {
      type: String,
      enum: ["player", "coach"],
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "receiverType",
    },

    text: { type: String, required: true },
    roomId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
