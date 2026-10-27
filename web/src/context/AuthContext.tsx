"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { clearSessionAction } from "@/app/actions/session";

export type UserLevel = "Ghost" | "Manager" | "Editor" | "Normal" | null;

interface AuthContextType {
  isAuthenticated: boolean;
  userLevel: UserLevel;
  login: (level: UserLevel) => void;
  logout: () => void;
  /** Force the state, e.g. after the server told us the session is gone. */
  setInitialAuthState: (isAuth: boolean, level: UserLevel) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({
  children,
  initialIsAuthenticated = false,
  initialUserLevel = null,
}: {
  children: ReactNode;
  initialIsAuthenticated?: boolean;
  initialUserLevel?: UserLevel;
}) => {
  // The server already called getMe() while rendering the layout, so its answer
  // is the only trustworthy source. Checking "is there a token cookie?" here
  // used to flip the UI to signed-in even when that token was stale, which made
  // the header offer «پنل مدیریت» while every server route bounced to /login.
  const [isAuthenticated, setIsAuthenticated] = useState(initialIsAuthenticated);
  const [userLevel, setUserLevel] = useState<UserLevel>(initialUserLevel);
  const router = useRouter();

  const setInitialAuthState = useCallback((isAuth: boolean, level: UserLevel) => {
    setIsAuthenticated(isAuth);
    setUserLevel(level);
  }, []);

  // Cookies are written by loginAction on the server; this only mirrors the
  // result in React state so the header updates without a full reload.
  const login = useCallback((level: UserLevel) => {
    setIsAuthenticated(true);
    setUserLevel(level);
  }, []);

  const logout = useCallback(async () => {
    try {
      await clearSessionAction();
    } finally {
      setIsAuthenticated(false);
      setUserLevel(null);
      router.replace("/");
      router.refresh();
    }
  }, [router]);

  const value = useMemo(
    () => ({ isAuthenticated, userLevel, login, logout, setInitialAuthState }),
    [isAuthenticated, userLevel, login, logout, setInitialAuthState]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
