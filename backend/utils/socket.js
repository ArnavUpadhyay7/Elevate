const socket = require("socket.io");
const Message = require("../models/message.model");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {

    console.log("New client connected:", socket.id);

    socket.on("joinChat", ({ senderId, senderType, receiverId, receiverType }) => {
      const roomId = [senderId, receiverId].sort().join("_");
      socket.join(roomId);
    });

    socket.on("sendMessage", async ({ senderId, senderType, receiverId, receiverType, text }) => {
      const roomId = [senderId, receiverId].sort().join("_");

      const messageData = {
        senderId,
        senderType,
        receiverId,
        receiverType,
        text,
        roomId,
      };
  
      try {
        const newMessage = await Message.create(messageData);
  
        io.to(roomId).emit("messageReceived", {
          _id: newMessage._id,
          text: newMessage.text,
          senderId: newMessage.senderId,
          senderType: newMessage.senderType,
          createdAt: newMessage.createdAt,
        });
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};

module.exports = initializeSocket;
