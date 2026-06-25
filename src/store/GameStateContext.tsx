import { createContext, useContext } from "react";

export type GameStateEvent = {
  phase: string;
  data: any;
};

const GameStateCtx = createContext<GameStateEvent | null>(null);

export const GameStateProvider = GameStateCtx.Provider;

export const useInitialGameState = (): GameStateEvent => {
  const value = useContext(GameStateCtx);
  if (!value) {
    throw new Error(
      "useInitialGameState must be used inside a GameStateProvider (i.e. under ProtectedRoute)",
    );
  }
  return value;
};
