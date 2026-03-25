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
import { SocketProvider } from "./store/SocketContext";
import Login from "./pages/Login";
import ProjectorGamePage from "./pages/projectorDisplay/ProjectorGamePage";

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
          element: <Navigate replace to="/login" />,
        },
        {
          path: "/home",
          element: <JoinGamePage />,
        },
        {
          path: "/login",
          element: <Login />,
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
          path: "/hostGame",
          element: <ProjectorGamePage />,
        }
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <SocketProvider>
      <LobbyProvider>
        <RouterProvider router={router} />
      </LobbyProvider>
    </SocketProvider>);
};

export default App;
