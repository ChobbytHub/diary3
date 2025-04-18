import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Diaries from "./Diaries";  // 日記のコンポーネント

export default function Home() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null); // 初期状態をnullに設定

  // ログイン状態の確認
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setIsAuthenticated(!!token); // トークンがあればログイン状態
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // ローディング表示
  }

  // ログアウト処理
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsAuthenticated(false);
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
