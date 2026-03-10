// context for the game lobby-
// relevant to lobby Gamepage and the page where the host can click on starting the game session
import { createContext, useContext, useState, useEffect } from "react";

type LobbyDataType = {
    gamePin: string;
    players: string[];
    quizId: string;
};

type LobbyContextType = {
    lobby: LobbyDataType | null;
    setLobby: (data: LobbyDataType) => void;
    clearLobby: () => void;
};

const LobbyContext = createContext<LobbyContextType | null>(null);

export const LobbyProvider = ({ children }: { children: React.ReactNode }) => {
    const [lobby, setLobbyState] = useState<LobbyDataType | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem("lobby");
        if (saved) {
            setLobbyState(JSON.parse(saved));
        }
    }, []);

    const setLobby = (data: LobbyDataType) => {
        setLobbyState(data);
        localStorage.setItem("lobby", JSON.stringify(data));
    };

    const clearLobby = () => {
        setLobbyState(null);
        localStorage.removeItem("lobby");
    };

    return (
        <LobbyContext.Provider value={{ lobby, setLobby, clearLobby }}>
            {children}
        </LobbyContext.Provider>
    );
};

export const useLobby = () => {
    const ctx = useContext(LobbyContext);
    if (!ctx) throw new Error("useLobby must be used inside LobbyProvider");
    return ctx;
};