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
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <LobbyProvider>
    <RouterProvider router={router} />
  </LobbyProvider>;
};

export default App;
