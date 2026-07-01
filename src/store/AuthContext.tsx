import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { type User } from "../types/quiz";

type AuthContextType = {
  user: User | null;
  token: string | null;
  setAuthToken: (token: string) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const readStoredAuth = (): { token: string | null; user: User | null } => {
  const savedToken = localStorage.getItem("token");
  if (!savedToken) return { token: null, user: null };
  try {
    return { token: savedToken, user: jwtDecode<User>(savedToken) };
  } catch {
    localStorage.removeItem("token");
    return { token: null, user: null };
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [{ token, user }, setAuth] = useState(readStoredAuth);

  const setAuthToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setAuth({ token: newToken, user: jwtDecode<User>(newToken) });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
