// src/components/Signup.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // 成功メッセージ用

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirm) {
      setError("パスワードが一致しません");
      return;
    }

    try {
      // 登録処理のみ
      await api.post("/auth/signup", { email, password });

      // 成功メッセージ表示
      setSuccess("登録が完了しました。ログインページに移動します…");

      // 2秒後にログインページに遷移
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (e) {
      if (e.response && e.response.data && e.response.data.message) {
        setError(e.response.data.message);
      } else {
        setError("登録に失敗しました");
      }
    }
  };

  return (
    <div>
      <h2>新規登録</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <br />
          <input
            type="email"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>パスワード（確認）</label>
          <br />
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={success !== ""}>登録</button>
      </form>
    </div>
  );
}
