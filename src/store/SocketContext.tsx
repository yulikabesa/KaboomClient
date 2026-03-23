import React, { createContext, useContext, useEffect, useState } from "react";
import { connectSocket, disconnectSocket } from "../services/socketService";

const SocketContext = createContext<any>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<any>(null);

    const initSocket = () => {
        const token = localStorage.getItem("token");

        if (token) {
            const newSocket = connectSocket(token);
            setSocket(newSocket);

            // 🔹 Rejoin after connection
            newSocket.on("connect", () => {
                const pin = localStorage.getItem("gamePin");
                if (pin) {
                    console.log("Rejoining game with pin:", pin);
                    socket.emit("game-event", {
                        type: "rejoin-game",
                        payload: {
                            pin,
                        },
                    });
                }
            });
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
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    return useContext(SocketContext);
};