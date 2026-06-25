import { type ReactNode, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useSocket } from "./SocketContext";
import { useAuth } from "./AuthContext";
import Loading from "../components/player/Loading";
import layoutClasses from "../components/UI/Layout.module.css";
import { GameStateProvider, type GameStateEvent } from "./GameStateContext";

type Role = "host" | "player";

interface Props {
  expectedRole: Role;
  children: ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ expectedRole, children }) => {
  const socket = useSocket();
  const { token } = useAuth();
  const { pin } = useParams<{ pin: string }>();

  const [role, setRole] = useState<Role | null>(null);
  const [initialState, setInitialState] = useState<GameStateEvent | null>(null);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    if (!socket || !pin) return;

    const handleRole = (response: { pin: string; role: Role | null }) => {
      if (response.pin !== pin) return;
      if (response.role === expectedRole) setRole(response.role);
      else setDenied(true);
    };

    const handleState = (state: GameStateEvent) => {
      setInitialState((prev) => prev ?? state);
    };

    const handleDisconnect = (reason: string) => {
      if (reason === "io server disconnect") setDenied(true);
    };

    socket.on("game-role", handleRole);
    socket.on("game-state", handleState);
    socket.on("disconnect", handleDisconnect);

    if (socket.connected) {
      socket.emit("game-event", { type: "check-game-role", payload: { pin } });
      socket.emit("game-event", { type: "get-game-state", payload: {} });
    }

    return () => {
      socket.off("game-role", handleRole);
      socket.off("game-state", handleState);
      socket.off("disconnect", handleDisconnect);
    };
  }, [socket, pin, expectedRole]);

  if (!token) return <Navigate to="/login" replace />;
  if (!pin) return <Navigate to="/home" replace />;
  if (denied) return <Navigate to="/home" replace />;
  if (!role || !initialState) {
    return (
      <div
        className={`${layoutClasses["background"]} ${layoutClasses["light-img"]}`}
      >
        <Loading />
      </div>
    );
  }

  return <GameStateProvider value={initialState}>{children}</GameStateProvider>;
};

export default ProtectedRoute;
