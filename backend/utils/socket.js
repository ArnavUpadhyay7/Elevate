const socket = require("socket.io");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    // Handle events

    socket.on("joinChat", () => {
        // Handle join chat
    });

    socket.on("sendMessage", () => {
        // Handle send message
    });

    socket.on("disconnect", () => {
      // Handle disconnect
    });
  });
};

module.exports = initializeSocket;
