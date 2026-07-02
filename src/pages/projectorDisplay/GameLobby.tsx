import classes from "./GameLobby.module.css";
import layoutClasses from "../../components/UI/Layout.module.css";
import kaboomLogo from "../../assets/kaboomLogo.svg";
import personIcon from "../../assets/personIcon.svg";
import { useLobby } from "../../store/LobbyContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSocket } from "../../store/SocketContext";
import { useRouteLoading } from "../../store/RouteLoadingContext";
import Loading from "../../components/player/Loading";
import { useRef } from "react";
import ToolTip from "../../components/UI/ToolTip";

const GameLobby: React.FC = () => {
  const socket = useSocket();
  const routeLoading = useRouteLoading();
  const { lobby, setLobby, addPlayer } = useLobby();
  const navigate = useNavigate();
  const { pin } = useParams<{ pin: string }>();
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const pinRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!socket || !pin) return;

    const handleState = (state: { phase: string; data: any }) => {
      if (state.phase !== "lobby" || !state.data) return;
      routeLoading?.setReady();
      setLobby({
        gamePin: pin,
        quizId: state.data.quizId ?? "",
        players: state.data.players ?? [],
      });
    };

    const handlePlayerJoined = (player: { id: string; nickname: string }) => {
      addPlayer(player);
    };

    const handleDisconnect = (reason: string) => {
      if (reason === "io server disconnect") {
        navigate("/home", { replace: true });
      }
    };

    socket.on("game-state", handleState);
    socket.on("player-joined", handlePlayerJoined);
    socket.on("disconnect", handleDisconnect);

    socket.emit("game-event", { type: "get-game-state", payload: {} });

    return () => {
      socket.off("game-state", handleState);
      socket.off("player-joined", handlePlayerJoined);
      socket.off("disconnect", handleDisconnect);
    };
  }, [socket, pin]);

  if (!pin) {
    return <Navigate to="/home" replace />;
  }

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

  if (!lobby || lobby.gamePin !== pin) {
    return (
      <div
        className={`${classes["page"]} ${layoutClasses["background"]} ${layoutClasses["light-img"]}`}
      >
        <Loading />
      </div>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pin);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
        setIsHovered(false);
      }, 1500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`${classes["page"]} ${layoutClasses["background"]} ${layoutClasses["light-img"]}`}
    >
      <div className={classes["top-info"]}>
        <div className={classes["right-rectangle"]}>
          <div className={classes["pin-text-overlay"]}>
            <p className={classes["pin-text"]}>קוד משחק:</p>
            <p
              ref={pinRef}
              className={classes["pin"]}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleCopy}
            >
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

      {pinRef.current && (isHovered || isCopied) && (
        <ToolTip
          target={pinRef.current}
          content={isCopied ? "הועתק!" : "העתק קוד משחק"}
          backgroundColor="black"
        />
      )}

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
