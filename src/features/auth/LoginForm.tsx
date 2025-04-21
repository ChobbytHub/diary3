// src/features/auth/LoginForm.tsx
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function LoginForm() {
  const { login, loginLoading, loginError } = useAuth();  // ← useAuth から必要なものを受け取る
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // useAuth.login が内部で API 呼び出し→AuthContext登録→diaries取得→Redux登録→navigate をやってくれる
    await login(email, password);
    // 成功時は useAuth の中で navigate("/") しています
  };

  return (
    <div>
      <h2>ログイン</h2>

      {/* useAuth.loginError を表示 */}
      {loginError && <p style={{ color: "red" }}>{loginError}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <Input
            label="メールアドレス"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Input
            label="パスワード"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" disabled={loginLoading}>
          {loginLoading ? "ログイン中..." : "ログイン"}
        </Button>
      </form>
    </div>
  );
}
