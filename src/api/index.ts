// src/api/index.ts
import axios from "axios";

// Vite では import.meta.env を利用して環境変数を取得
const baseURL = import.meta.env.VITE_API_URL as string;

// Axios インスタンス作成
const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

// リクエスト前に JWT をセット
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// レスポンスのエラーハンドリング（特に401）
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // トークン無効や期限切れ → トークン削除＋ログイン画面へリダイレクト
      localStorage.removeItem("jwt");
      window.alert("ログインの有効期限が切れました。再度ログインしてください。");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
