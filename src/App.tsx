import "./App.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import NotFound from "./pages/NotFound";
import JoinGamePage from "./pages/JoinGamePage";
import { Outlet } from 'react-router-dom';
import GameLobby from "./pages/GameLobby";

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
          element: <GameLobby pin="1234567" />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
