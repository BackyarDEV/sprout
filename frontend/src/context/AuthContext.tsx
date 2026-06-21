/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";
import type { AuthFormState } from "../types/Auth";
import * as authService from "../services/authService";

type User = { username: string } | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  login: (f: AuthFormState) => Promise<void>;
  register: (f: AuthFormState) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    try {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");
      return token && username ? { username } : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  const login = async (form: AuthFormState) => {
    setLoading(true);
    try {
      const res = await authService.login(form);
      localStorage.setItem("token", res.token);
      localStorage.setItem("username", res.user.username);
      setUser(res.user);
    } finally {
      setLoading(false);
    }
  };

  const register = async (form: AuthFormState) => {
    setLoading(true);
    try {
      const res = await authService.register(form);
      localStorage.setItem("token", res.token);
      localStorage.setItem("username", res.user.username);
      setUser(res.user);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
