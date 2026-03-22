import { useNavigate } from "react-router-dom";
import { useLobby } from "../../store/LobbyContext";
import { useSocket } from "../../store/SocketContext";

export const MyKabooms = () => {
  const navigate = useNavigate();
  const { setLobby } = useLobby();
  const socket = useSocket();

  const createGameSession = () => {
    const quizIdClicked = "69bab87d048fbdd27736628f";

    // Emit event to create game
    socket.emit("game-event", {
      type: "create-game-session",
      payload: { quizId: quizIdClicked },
    });
    console.log('h');

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
