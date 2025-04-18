// src/components/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const navigate = useNavigate(); // ログイン後に遷移するため
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // 送信前にエラーメッセージをリセット

    try {
      // ログインAPI呼び出し
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("jwt", data.token); // JWT を localStorage に保存

      // ログイン後の画面に遷移
      navigate("/"); // 適切な遷移先（例えば日記一覧ページ）へ遷移

    } catch (e) {
      // サーバーエラーのメッセージをエラー表示
      if (e.response && e.response.data && e.response.data.message) {
        setError(e.response.data.message); // エラーメッセージをサーバーから取得
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
