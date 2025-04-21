// src/pages/auth/SignupForm.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";

export default function SignupForm() {
  const { signup, signupLoading, signupError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setSuccess("");
      return alert("パスワードが一致しません");
    }

    const isSuccess = await signup(email, password);  // signupの結果を待つ
    if (isSuccess) {
      setSuccess("登録が完了しました。ログインページに移動します…");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setSuccess("");  // 失敗した場合はクリア
    }
  };

  return (
    <div>
      <h2>新規登録</h2>

      {signupError && <p style={{ color: "red" }}>{signupError}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <Input
          label="メールアドレス"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="パスワード"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          label="パスワード確認"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <Button type="submit" disabled={signupLoading}>
          {signupLoading ? "登録中..." : "登録"}
        </Button>
      </form>
    </div>
  );
}
