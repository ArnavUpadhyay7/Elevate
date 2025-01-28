const socket = require("socket.io");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {

    console.log("Client connected");

    socket.on("joinChat", ({ username, senderId, recieverId }) => {
      const roomId = [senderId, recieverId].sort().join("_");
      socket.join(roomId);
    });

    socket.on("sendMessage", ({senderId, recieverId, text}) => {
      const roomId = [senderId, recieverId].sort().join("_");
      const createdAt = new Date().toISOString();
      io.to(roomId).emit("messageRecieved", {text, senderId, createdAt});
    });

    socket.on("disconnect", () => {
      // Handle disconnect
    });
  });
};

module.exports = initializeSocket;
