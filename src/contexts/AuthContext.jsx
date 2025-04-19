// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // JWT の有効性を確認する関数
  const checkTokenValidity = () => {
    const token = localStorage.getItem("jwt");
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000; // 現在時刻（秒）
      return decoded.exp > now;
    } catch (err) {
      return false;
    }
  };

  // 初回マウント時にトークンを確認
  useEffect(() => {
    if (checkTokenValidity()) {
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("jwt"); // 期限切れなら削除
      setIsAuthenticated(false);
    }
  }, []);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    localStorage.removeItem("jwt");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
