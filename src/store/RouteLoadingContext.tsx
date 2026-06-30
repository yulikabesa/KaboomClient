import { createContext, useContext } from "react";

interface RouteLoadingCtx {
  setReady: () => void;
}

export const RouteLoadingContext = createContext<RouteLoadingCtx | null>(null);

export const useRouteLoading = () => useContext(RouteLoadingContext);
