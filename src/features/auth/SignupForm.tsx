import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../api/auth/signup"; // ユーザー登録API
import Input from "../../components/ui/Input"; // 再利用可能なInputコンポーネント
import Button from "../../components/ui/Button"; // 再利用可能なButtonコンポーネント

export default function SignupForm() {
  const navigate = useNavigate();

  // ユーザー入力状態管理
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");

  // メッセージ管理
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // フォーム送信処理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // パスワード一致確認
    if (password !== confirm) {
      setError("パスワードが一致しません");
      return;
    }

    try {
      // APIへユーザー登録リクエスト（オブジェクトで渡す）
      await signupUser({ email, password });

      // 成功メッセージを表示
      setSuccess("登録が完了しました。ログインページに移動します…");

      // 2秒後にログイン画面へリダイレクト
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err); // デバッグ用
      setError("登録に失敗しました");
    }
  };

  return (
    <div>
      <h2>新規登録</h2>

      {/* エラーメッセージ */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 成功メッセージ */}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {/* フォーム */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>パスワード</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>パスワード（確認）</label>
          <Input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>
        <Button type="submit">登録</Button>
      </form>
    </div>
  );
}
