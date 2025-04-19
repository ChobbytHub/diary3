// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // エラーステート

  const checkTokenValidity = () => {
    const token = localStorage.getItem("jwt");
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;
      return decoded.exp > now;
    } catch (err) {
      setError("トークンの検証に失敗しました。再度ログインしてください。");
      return false;
    }
  };

  useEffect(() => {
    const valid = checkTokenValidity();
    setIsAuthenticated(valid);
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("jwt", token);
    setIsAuthenticated(true);
    setError(null); // エラーリセット
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setIsAuthenticated(false);
    setError(null); // エラーリセット
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, loading, error, setError }}
    >
      {children}
    </AuthContext.Provider>
  );
};
