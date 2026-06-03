import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

type User = {
  _id: string;
  name: string;
  email?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  setAuthToken: (token: string) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // restore login on refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) return;
    try {
      const decoded = jwtDecode<User>(savedToken);
      setToken(savedToken);
      setUser(decoded);
    } catch (error) {
      console.error("Invalid token");
      localStorage.removeItem("token");
    }
  }, []);

  const setAuthToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    const decoded = jwtDecode<User>(newToken);
    setToken(newToken);
    setUser(decoded);
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
