// src/pages/HomePage.tsx
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Diaries from "../components/Diaries";
import Button from "../components/ui/Button";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>ようこそ！</h2>
      <Button onClick={() => navigate("/signup")}>新規登録</Button>
      <Button onClick={() => navigate("/login")}>ログイン</Button>
    </div>
  );
}

function LoggedIn() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h2>ようこそ、ログインしています！</h2>
      <Button onClick={handleLogout}>ログアウト</Button>
      <Diaries />
    </div>
  );
}

export default function HomePage() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>{!isAuthenticated ? <Welcome /> : <LoggedIn />}</div>;
}
