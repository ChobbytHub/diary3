// src/pages/Welcome.tsx
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

export default function Welcome() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>ようこそ！</h2>
      <Button onClick={() => navigate("/signup")}>新規登録</Button>
      <Button onClick={() => navigate("/login")}>ログイン</Button>
    </div>
  );
}
