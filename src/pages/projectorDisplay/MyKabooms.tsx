import React from "react";
import { useNavigate } from "react-router-dom";
import { useLobby } from "../../store/LobbyContext";
import { connectSocket } from "../../services/socketService";

export const MyKabooms = () => {
  const navigate = useNavigate();
  const { setLobby } = useLobby();

  const createGameSession = () => {
    const quizIdClicked = "69b8fe30e833a33118dea163";
    const socket = connectSocket();

    // Emit event to create game
    socket.emit("game-event", {
      type: "create-game-session",
      payload: { quizId: quizIdClicked },
    });

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
