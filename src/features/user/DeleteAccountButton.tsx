// src/features/DeleteAccountButton.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // useHistory -> useNavigate
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { deleteAccount } from "../../api/deleteAccount";
import Button from "../../components/ui/Button";

const DeleteAccountButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();  // useHistory -> useNavigate
  const { logout } = useContext(AuthContext);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "本当にアカウントを削除しますか？この操作は元に戻せません。"
    );

    if (confirmed) {
      setLoading(true); // 削除処理開始

      try {
        await deleteAccount(); // アカウント削除APIの呼び出し
        setSuccessMessage("アカウントが削除されました。"); // 削除成功メッセージ表示

        // 2秒後にホームにリダイレクト
        setTimeout(() => {
          logout();
          navigate("/");  // useNavigateを使用してリダイレクト
        }, 2000); // 2秒後にホームページへリダイレクト
      } catch (error) {
        console.error("アカウント削除に失敗しました", error);
        setSuccessMessage("アカウント削除に失敗しました。もう一度お試しください。");
      } finally {
        setLoading(false); // ローディング状態を解除
      }
    }
  };

  return (
    <div>
      <Button onClick={handleDelete} disabled={loading}>
        {loading ? "削除中..." : "アカウントを削除する"}
      </Button>

      {successMessage && <p>{successMessage}</p>} {/* 削除成功メッセージ */}
    </div>
  );
};

export default DeleteAccountButton;
