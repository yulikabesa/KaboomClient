import { createContext, useContext, useState } from "react";

type LobbyDataType = {
  gamePin: string;
  players: { nickname: string; id: string }[];
  quizId: string;
};

type LobbyContextType = {
  lobby: LobbyDataType | null;
  setLobby: (data: LobbyDataType) => void;
  addPlayer: (player: { nickname: string; id: string }) => void;
  clearLobby: () => void;
};

const LobbyContext = createContext<LobbyContextType | null>(null);

export const LobbyProvider = ({ children }: { children: React.ReactNode }) => {
  const [lobby, setLobbyState] = useState<LobbyDataType | null>(null);

  const setLobby = (data: LobbyDataType) => {
    setLobbyState(data);
  };

  const clearLobby = () => {
    setLobbyState(null);
  };

  // TODO: HANDLE SAME USER REJOINED DIFFERENTLY
  const addPlayer = (player: { nickname: string; id: string }) => {
    setLobbyState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        players: [...prev.players.filter((p) => p.id !== player.id), player],
      };
    });
  };

  const removePlayer = (userId: string) => {
    setLobbyState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        players: prev.players.filter((p) => p.id !== userId),
      };
    });
  };

  return (
    <LobbyContext.Provider value={{ lobby, setLobby, addPlayer, clearLobby }}>
      {children}
    </LobbyContext.Provider>
  );
};

export const useLobby = () => {
  const ctx = useContext(LobbyContext);
  if (!ctx) throw new Error("useLobby must be used inside LobbyProvider");
  return ctx;
};
