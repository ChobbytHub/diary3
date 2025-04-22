// src/pages/HomePage.tsx
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Welcome from "./Welcome";
import LoggedIn from "./LoggedIn";

export default function HomePage() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return <div>読み込み中...</div>;
  return isAuthenticated ? <LoggedIn /> : <Welcome />;
}
