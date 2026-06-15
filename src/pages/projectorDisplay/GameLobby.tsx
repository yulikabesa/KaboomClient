import classes from "./GameLobby.module.css";
import kaboomLogo from "../../assets/kaboomLogo.svg";
import personIcon from "../../assets/personIcon.svg";
import { useLobby } from "../../store/LobbyContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSocket } from "../../store/SocketContext";

const GameLobby: React.FC = () => {
  const socket = useSocket();
  const { lobby, addPlayer } = useLobby();
  const navigate = useNavigate();
  const { pin } = useParams<{ pin: string }>();
  if (!lobby || !pin || lobby.gamePin !== pin) {
    return <Navigate to="/home" replace />;
  }

  useEffect(() => {
    if (!socket) return;
    const handlePlayerJoined = (player: { id: string; nickname: string }) => {
      addPlayer(player);
    };

    socket.on("player-joined", handlePlayerJoined);

    return () => {
      socket.off("player-joined", handlePlayerJoined);
    };
  }, [addPlayer]);

  const startGame = () => {
    if (!socket || !lobby) return;
    socket.once("game-started", () => {
      navigate(`/hostGame/${pin}`, {
        replace: true,
      });
    });
    socket.emit("game-event", {
      type: "start-game",
      payload: null,
    });
  };

  return (
    <div className={`${classes["page"]} ${classes["background"]}`}>
      <div className={classes["top-info"]}>
        <div className={classes["right-rectangle"]}>
          <div className={classes["pin-text-overlay"]}>
            <p className={classes["pin-text"]}>קוד משחק:</p>
            <p className={classes["pin"]}>
              {lobby.gamePin.slice(0, 3)} {lobby.gamePin.slice(3)}
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
          {lobby.players.length.toString()}
          <img src={personIcon} alt="icon" />
        </div>
        <img
          className={classes["kaboom-logo"]}
          src={kaboomLogo}
          alt="kaboom logo"
        />
      </div>

      <div className={classes["player-name-box"]}>
        {lobby.players.map((player, index) => (
          <div className={classes["names"]} key={`${index}-player`}>
            {player.nickname}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameLobby;
