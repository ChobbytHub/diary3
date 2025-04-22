// src/features/LogoutButton.tsx
import React from "react";
import { useNavigate } from "react-router-dom";  // React Router v6 の useNavigate
import Button from "../../components/ui/Button";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    // ログアウト処理
    logout();  // Redux のログアウトアクションをディスパッチしてセッションを解除

    // ログアウト後にログインページへリダイレクト
    navigate("/login");  // ログインページにリダイレクト
  };

  return (
    <Button onClick={handleLogout}>
      ログアウト
    </Button>
  );
};

export default LogoutButton;
