// src/types/auth.d.ts
import { ReactNode } from "react";

// トークンの型（expだけ使う想定）
export interface DecodedToken {
  exp: number;
}

// AuthContextで使う型
export interface AuthContextType {
  isAuthenticated: boolean;
  jwt: string | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
  error: string | null;
  setError: (msg: string | null) => void;
}

// AuthProviderのProps型（childrenを受け取る）
export interface AuthProviderProps {
  children: ReactNode;
}

// ログインリクエストで使う型
export interface LoginRequest {
  email: string;
  password: string;
}

// ログイン成功時のレスポンスの型（例としてtokenのみ）
export interface LoginResponse {
  token: string;
}

// サインアップのリクエストデータ型
export interface SignupRequest {
  email: string;
  password: string;
}

// サインアップのレスポンスデータ型（適切なレスポンス構造に合わせて変更してください）
export interface SignupResponse {
  message: string;
  userId: string;
  // 他にも必要なフィールドを追加
}
