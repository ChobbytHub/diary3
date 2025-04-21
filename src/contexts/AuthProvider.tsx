// AuthProvider.tsx
import { useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";
import { DecodedToken } from "../types/auth";

// AuthProviderコンポーネント（認証状態の管理と、ログイン・ログアウト機能を提供）
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 認証されているかどうかの状態
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // トークン検証中などのローディング状態
  const [jwt, setJwt] = useState<string | null>(localStorage.getItem("jwt"));
  // トークンの有効性をチェックするための状態
  const [loading, setLoading] = useState(true);
  // エラーメッセージ（トークン検証エラーなど）
  const [error, setError] = useState<string | null>(null);

  // トークンの有効性をチェックする関数
  const checkTokenValidity = () => {
    // ローカルストレージからJWTトークンを取得
    const token = localStorage.getItem("jwt");
    if (!token) return false; // トークンがなければ無効

    try {
      // トークンをデコードして、JWTのペイロードを取得
      const decoded = jwtDecode<DecodedToken>(token);
      const now = Date.now() / 1000; // 現在時刻を秒単位で取得
      return decoded.exp > now; // トークンの有効期限が現在時刻より後ならtrue
    } catch {
      // トークンが無効な場合はエラーを表示
      setError("トークンの検証に失敗しました。再度ログインしてください。");
      return false;
    }
  };

  // コンポーネントの初期化時にトークンの有効性をチェック
  useEffect(() => {
    setTimeout(() => {
      const valid = checkTokenValidity();
      setIsAuthenticated(valid);
      setLoading(false);
    }, 0);
  }, []);

  // ログイン処理（トークンをローカルストレージに保存し、認証状態を更新）
  const login = (token: string) => {
    localStorage.setItem("jwt", token); // トークンをローカルストレージに保存
    setJwt(token); // トークンを状態に保存
    setIsAuthenticated(true); // 認証状態をtrueに設定
    setError(null); // エラーをリセット
  };

  // ログアウト処理（トークンを削除し、認証状態をfalseに設定）
  const logout = () => {
    localStorage.removeItem("jwt"); // ローカルストレージからトークンを削除
    setJwt(null); // トークンを状態から削除
    setIsAuthenticated(false); // 認証状態をfalseに設定
    setError(null); // エラーをリセット
  };

  // AuthContextを提供し、子コンポーネントに認証状態や操作を共有
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated, // 認証されているかどうか
        jwt, // JWTトークン
        login, // ログイン処理
        logout, // ログアウト処理
        loading, // ローディング状態
        error, // エラーメッセージ
        setError, // エラー状態を更新する関数
      }}
    >
      {!loading && children} {/* 認証情報を子コンポーネントに渡す */}
    </AuthContext.Provider>
  );
};

export default AuthProvider; // AuthProviderコンポーネントをエクスポート
