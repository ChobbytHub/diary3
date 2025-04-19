// src/api/index.js

import axios from "axios";

// Axios インスタンス作成
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { "Content-Type": "application/json" },
});

// リクエスト前に JWT をセット
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
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
      // トークン無効や期限切れ → ログアウト処理
      localStorage.removeItem("jwt");

      // 必要ならユーザー通知（例：トーストなど）
      alert("ログインの有効期限が切れました。再度ログインしてください。");

      // ログインページに遷移（SPA対応：リロードも可）
      window.location.href = "/login"; // or useNavigate() でリダイレクト
    }

    return Promise.reject(error);
  }
);

export default api;
