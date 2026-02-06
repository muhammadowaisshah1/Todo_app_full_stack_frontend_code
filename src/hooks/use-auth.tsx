"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { api, setAuthToken, clearAuthToken, APIError } from "@/lib/api";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      // Decode JWT to get user info (basic client-side check)
      const payload = JSON.parse(atob(token.split(".")[1]));

      // Check if token is expired
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        clearAuthToken();
        setUser(null);
        setIsLoading(false);
        return;
      }

      setUser({
        id: payload.sub,
        email: payload.email || "",
        name: payload.name || "",
      });
    } catch (error) {
      clearAuthToken();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.post<{
        access_token: string;
        token_type: string;
        user: User;
      }>("/api/auth/signin", { email, password }, { skipAuth: true });

      setAuthToken(response.access_token);
      setUser(response.user);
      router.push("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      await api.post("/api/auth/signup", { email, password, name }, { skipAuth: true });
      // Auto sign-in after signup
      await signIn(email, password);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    clearAuthToken();
    setUser(null);
    router.push("/");
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthContext };
