import React, { createContext, useContext, useEffect, useState } from "react";
import { connectSocket, disconnectSocket } from "../services/socketService";

const SocketContext = createContext<any>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<any>(null);

  const getPinFromUrl = (): string | null => {
    const match = window.location.pathname.match(
      /^\/(?:lobby|game|hostGame)\/(\d+)/,
    );
    return match ? match[1] : null;
  };

  const initSocket = () => {
    const token = localStorage.getItem("token");
    const pin = getPinFromUrl();

    if (token) {
      const newSocket = connectSocket(token, pin);
      setSocket(newSocket);
    }
  };

  useEffect(() => {
    // run on mount
    initSocket();

    // listen to login event
    window.addEventListener("login", initSocket);

    return () => {
      window.removeEventListener("login", initSocket);
      disconnectSocket();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
