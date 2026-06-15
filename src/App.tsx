import "./App.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import NotFound from "./pages/NotFound";
import JoinGamePage from "./pages/playerDisplay/JoinGamePage";
import { Outlet } from "react-router-dom";
import GameLobby from "./pages/projectorDisplay/GameLobby";
import { LobbyProvider } from "./store/LobbyContext";
import PlayerGamePage from "./pages/playerDisplay/PlayerGamePage";
import { SocketProvider } from "./store/SocketContext";
import Login from "./pages/Login";
import ProjectorGamePage from "./pages/projectorDisplay/ProjectorGamePage";
import Home from "./pages/Home";
import Create from "./pages/Create";
import { AuthProvider } from "./store/AuthContext";

const App = () => {
  // const { user } = useAuth();
    // const userId = user?._id;

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
          element: <Home />,
        },
        {
          path: "/create/:quizId",
          element: <Create />,
        },
        {
          path: "/create",
          element: <Create />,
        },
        {
          path: "/join",
          element: <JoinGamePage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/lobby/:pin",
          element: <GameLobby />,
        },
        {
          path: "/game/:pin",
          element: <PlayerGamePage />,
        },
        {
          path: "/hostGame/:pin",
          element: <ProjectorGamePage />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <AuthProvider>
      <SocketProvider>
        <LobbyProvider>
          <RouterProvider router={router} />
        </LobbyProvider>
      </SocketProvider>
    </AuthProvider>
  );
};

export default App;
