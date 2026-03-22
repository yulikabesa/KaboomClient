// handle the socket connection
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const createSocket = () => {
  if (!socket) {
    socket = io("http://localhost:3000", {
      autoConnect: false, 
    });
  }
  return socket;
};

export const connectSocket = (token: string) => {
  if (!socket) {
    socket = createSocket();
  }

  socket.auth = { token }; // set token BEFORE connect
  socket.connect();
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};