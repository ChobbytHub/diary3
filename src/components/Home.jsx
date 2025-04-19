import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Diaries from "./Diaries";

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      {!isAuthenticated ? (
        <div>
          <h2>ようこそ！</h2>
          <button onClick={() => navigate("/signup")}>新規登録</button>
          <button onClick={() => navigate("/login")}>ログイン</button>
        </div>
      ) : (
        <div>
          <h2>ようこそ、ログインしています！</h2>
          <button onClick={handleLogout}>ログアウト</button>
          <Diaries />
        </div>
      )}
    </div>
  );
}
