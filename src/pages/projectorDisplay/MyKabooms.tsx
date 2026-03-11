import React from "react";
import { useNavigate } from "react-router-dom";
import { useLobby } from "../../store/LobbyContext";
import { connectSocket } from "../../services/socketService";

export const MyKabooms = () => {
  const navigate = useNavigate();
  const { setLobby } = useLobby();

  const createGameSession = () => {
    const quizIdClicked = "69b02da5aafb3d0aa67f7627";
    const socket = connectSocket();

    // Emit event to create game
    socket.emit("create-game-session", { quizId: quizIdClicked });

    // Listen for the game-created event only once
    socket.once("game-created", ({ pin }: { pin: string }) => {
      console.log("Game created with pin:", pin);
      setLobby({
        gamePin: pin,
        players: [],
        quizId: quizIdClicked,
      });
      navigate("/lobby");
    });
  };

  return (
    <div>
      <button onClick={createGameSession}>Start Game Session</button>
    </div>
  );
};
