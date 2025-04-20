import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"; // 認証用のグローバル状態
import { loginUser } from "../../api/auth/login"; // API：ログイン処理

export default function LoginForm() {
  const navigate = useNavigate();
  const { login, error, setError } = useContext(AuthContext); // Contextからログイン処理関数などを取得

  // ユーザー入力を状態として保持
  const [email, setEmail] = useState<string>("");       // メールアドレスの状態
  const [password, setPassword] = useState<string>(""); // パスワードの状態
  const [loading, setLoading] = useState<boolean>(false); // ログイン処理中かどうか

  // フォーム送信時の処理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // フォームのデフォルト動作を止める（ページリロード防止）
    setError(null);     // エラー状態を一旦クリア
    setLoading(true);   // ローディング状態に

    try {
      // API呼び出し。成功すればトークンを取得できる
      const { token } = await loginUser({ email, password });

      // トークンをcontextに保存し、グローバルでログイン状態を管理
      login(token);

      // ホーム画面（"/"）へリダイレクト
      navigate("/");
    } catch (err: unknown) {
      // エラー内容をデバッグ用に出力
      console.error("ログインエラー:", err);

      // ユーザー向けエラーメッセージをセット
      setError("メールアドレスまたはパスワードが間違っています");
    } finally {
      // 処理終了後にローディング状態を解除
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>ログイン</h2>

      {/* エラーがある場合は表示 */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ログインフォーム */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // 入力が変わるたびに状態を更新
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

        {/* ローディング中はボタンを無効化 */}
        <button type="submit" disabled={loading}>
          {loading ? "ログイン中..." : "ログイン"}
        </button>
      </form>
    </div>
  );
}
