import { type ReactNode, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useSocket } from "./SocketContext";
import { useAuth } from "./AuthContext";
import Loading from "../components/player/Loading";
import layoutClasses from "../components/UI/Layout.module.css";

type Role = "host" | "player";
type Status = "loading" | "allowed" | "denied";

interface Props {
  expectedRole: Role;
  children: ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ expectedRole, children }) => {
  const socket = useSocket();
  const { token } = useAuth();
  const { pin } = useParams<{ pin: string }>();

  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!socket || !pin) return;

    const handleRole = (response: { pin: string; role: Role | null }) => {
      if (response.pin !== pin) return;
      setStatus(response.role === expectedRole ? "allowed" : "denied");
    };

    const handleDisconnect = (reason: string) => {
      if (reason === "io server disconnect") {
        setStatus("denied");
      }
    };

    const sendCheck = () => {
      socket.emit("game-event", {
        type: "check-game-role",
        payload: { pin },
      });
    };

    socket.on("game-role", handleRole);
    socket.on("disconnect", handleDisconnect);

    if (socket.connected) {
      sendCheck();
    }

    return () => {
      socket.off("game-role", handleRole);
      socket.off("disconnect", handleDisconnect);
    };
  }, [socket, pin, expectedRole]);

  if (!token) return <Navigate to="/login" replace />;
  if (!pin) return <Navigate to="/home" replace />;
  if (status === "denied") return <Navigate to="/home" replace />;
  if (status === "loading")
    return (
      <div
        className={`${layoutClasses["background"]} ${layoutClasses["light-img"]}`}
      >
        <Loading />
      </div>
    );

  return <>{children}</>;
};

export default ProtectedRoute;
