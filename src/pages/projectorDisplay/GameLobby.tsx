import classes from "./GameLobby.module.css";
import layoutClasses from "../../components/UI/Layout.module.css";
import kaboomLogo from "../../assets/kaboomLogo.svg";
import personIcon from "../../assets/personIcon.svg";
import { useLobby } from "../../store/LobbyContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSocket } from "../../store/SocketContext";
import { useInitialGameState } from "../../store/GameStateContext";

const GameLobby: React.FC = () => {
  const socket = useSocket();
  const initialState = useInitialGameState();
  const { lobby, setLobby, addPlayer } = useLobby();
  const navigate = useNavigate();
  const { pin } = useParams<{ pin: string }>();

  useEffect(() => {
    if (!pin) return;
    if (initialState.phase === "lobby" && initialState.data) {
      setLobby({
        gamePin: pin,
        quizId: initialState.data.quizId ?? "",
        players: initialState.data.players ?? [],
      });
    }
  }, []);

  useEffect(() => {
    if (!socket) return;
    const handlePlayerJoined = (player: { id: string; nickname: string }) => {
      addPlayer(player);
    };
    socket.on("player-joined", handlePlayerJoined);
    return () => {
      socket.off("player-joined", handlePlayerJoined);
    };
  }, [socket, addPlayer]);

  const startGame = () => {
    if (!socket || !lobby) return;
    socket.once("game-started", () => {
      navigate(`/hostGame/${pin}`, { replace: true });
    });
    socket.emit("game-event", {
      type: "start-game",
      payload: null,
    });
  };


  const view = lobby ?? {
    gamePin: pin ?? "",
    quizId: "",
    players: [] as { id: string; nickname: string }[],
  };

  return (
    <div
      className={`${classes["page"]} ${layoutClasses["background"]} ${layoutClasses["light-img"]}`}
    >
      <div className={classes["top-info"]}>
        <div className={classes["right-rectangle"]}>
          <div className={classes["pin-text-overlay"]}>
            <p className={classes["pin-text"]}>קוד משחק:</p>
            <p className={classes["pin"]}>
              {view.gamePin.slice(0, 3)} {view.gamePin.slice(3)}
            </p>
          </div>
        </div>
        <div className={classes["left-rectangle"]}>
          <div className={classes["text-overlay"]}>
            חפשו <span className={classes["bold"]}>KABOOM</span> או
            <br /> כנסו מה - <span className={classes["bold"]}>MOOC</span>
          </div>
        </div>
      </div>

      <div className={classes["buttons-box"]}>
        <div onClick={startGame} className={classes["start-button"]}>
          התחל
        </div>
        <div className={classes["player-number-box"]}>
          {view.players.length.toString()}
          <img src={personIcon} alt="icon" />
        </div>
        <img
          className={classes["kaboom-logo"]}
          src={kaboomLogo}
          alt="kaboom logo"
        />
      </div>

      <div className={classes["player-name-box"]}>
        {view.players.map((player, index) => (
          <div className={classes["names"]} key={`${index}-player`}>
            {player.nickname}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameLobby;
