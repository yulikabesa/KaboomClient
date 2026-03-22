import "./App.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import NotFound from "./pages/NotFound";
import JoinGamePage from "./pages/playerDisplay/JoinGamePage";
import { Outlet } from 'react-router-dom';
import GameLobby from "./pages/projectorDisplay/GameLobby";
import { LobbyProvider } from "./store/LobbyContext";
import PlayerGamePage from "./pages/playerDisplay/PlayerGamePage";
import GameQuestion from "./pages/projectorDisplay/GameQuestion";
import { SocketProvider } from "./store/SocketContext";
import { useEffect } from "react";
import { connectSocket } from "./services/socketService";

const App = () => {
  // const authCtx = useContext(AuthContext);
  // const isLoggedIn = authCtx.isLoggedIn;
  // const isAdmin = authCtx.isAdmin;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <Navigate replace to="/home" />,
        },
        {
          path: "/home",
          element: <JoinGamePage />,
        },
        {
          path: "/lobby",
          element: <GameLobby />,
        },
        {
          path: "/game",
          element: <PlayerGamePage />,
        },
        {
          path: "/gameQuestion",
          element: <GameQuestion />,
        }
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      connectSocket(token); // auto reconnect after refresh
    }
  }, []);

  //todo add this whenever login happens:
  // import { connectSocket } from "../services/socketService";

  // const handleLogin = async () => {
  //   const token = "jwt-from-server";

  //   localStorage.setItem("token", token);

  //   connectSocket(token); // connect ONLY here
  // };

  return (
    <SocketProvider>
      <LobbyProvider>
        <RouterProvider router={router} />
      </LobbyProvider>
    </SocketProvider>);
};

export default App;
