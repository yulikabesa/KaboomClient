import React, { createContext, useContext, useMemo } from 'react';
import { connectSocket } from '../services/socketService';


const SocketContext = createContext<ReturnType<typeof connectSocket> | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const socket = useMemo(() => connectSocket(), []);
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const socket = useContext(SocketContext);
    if (!socket) throw new Error("useSocket must be used within a SocketProvider");
    return socket;
};