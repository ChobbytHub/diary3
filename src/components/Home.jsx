import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext"; // AuthContext をインポート
import Diaries from "./Diaries"; // 日記のコンポーネント

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext); // AuthContext から isAuthenticated と logout を取得

  // ログアウト処理
  const handleLogout = () => {
    logout(); // AuthContext の logout 関数を呼び出してログアウト処理
    navigate("/login"); // ログインページに遷移
  };

  return (
    <div>
      {/* ログイン状態によって表示内容を切り替える */}
      {!isAuthenticated ? (
        // 未ログイン時の表示
        <div>
          <h2>ようこそ！</h2>
          <button onClick={() => navigate("/signup")}>新規登録</button>
          <button onClick={() => navigate("/login")}>ログイン</button>
        </div>
      ) : (
        // ログイン済み時の表示
        <div>
          <h2>ようこそ、ログインしています！</h2>
          <button onClick={handleLogout}>ログアウト</button>

          {/* 日記コンポーネント */}
          <Diaries />
        </div>
      )}
    </div>
  );
}
