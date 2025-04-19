// src/features/auth/LoginForm.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { loginUser } from "../../api/auth/login"; // API呼び出し

export default function LoginForm() {
  const navigate = useNavigate();
  const { login, error, setError } = useContext(AuthContext); // AuthContextから取得
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // 送信時にエラーメッセージをリセット

    setLoading(true);
    try {
      // ログインAPI呼び出し
      const { token } = await loginUser(email, password);

      // トークンをAuthContextに渡してログイン状態を更新
      login(token);

      // ログイン成功後、メインページに遷移
      navigate("/");
    } catch (err) {
      setError("メールアドレスまたはパスワードが間違っています");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>ログイン</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* エラーメッセージ表示 */}
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
        <button type="submit" disabled={loading}>
          ログイン
        </button>
      </form>
    </div>
  );
}
