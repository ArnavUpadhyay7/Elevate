import { io } from "socket.io-client";
import { BASE_URL } from "../constants";

let socket = null;

export const createSocketConnection = () => {
  if (socket) return socket;

  if (location.hostname === "localhost") {
    socket = io(BASE_URL, {
      withCredentials: true,
      transports: ["websocket"],
    });
  } else {
    socket = io("/", {
      path: "/socket.io",
      withCredentials: true,
      transports: ["websocket"],
    });
  }

  return socket;
};
