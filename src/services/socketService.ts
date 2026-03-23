// handle the socket connection
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (token: string) => {
  if (socket) {
    socket.disconnect(); // Force reconnect when token changes
  }

  socket = io("http://localhost:3000", {
    auth: { token },
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};