// src/components/Login.jsx

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { AuthContext } from "../contexts/AuthContext";

/**
 * Login コンポーネント
 * - メールアドレス・パスワードを入力してログイン
 * - 成功時にJWTをlocalStorageに保存し、AuthContextで認証状態を更新
 * - ホーム（"/"）へリダイレクト
 */
export default function Login() {
  const navigate = useNavigate();                    // 画面遷移用
  const { login } = useContext(AuthContext);         // AuthContextのlogin関数
  const [email, setEmail] = useState("");            // メールアドレス
  const [password, setPassword] = useState("");      // パスワード
  const [error, setError] = useState("");            // エラーメッセージ

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // 送信前にエラーメッセージをリセット

    try {
      // 1) ログインAPIへPOST
      const { data } = await api.post("/auth/login", { email, password });

      // 2) JWT を localStorage に保存
      localStorage.setItem("jwt", data.token);

      // 3) AuthContext にもログイン状態を通知
      login();

      // 4) ホームへリダイレクト
      navigate("/");
    } catch (e) {
      // サーバーからのエラーメッセージがあれば表示、なければ汎用メッセージ
      if (e.response?.data?.message) {
        setError(e.response.data.message);
      } else {
        setError("ログインに失敗しました。再度お試しください。");
      }
    }
  };

  return (
    <div>
      <h2>ログイン</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <br />
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>パスワード</label>
          <br />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">ログイン</button>
      </form>
    </div>
  );
}
