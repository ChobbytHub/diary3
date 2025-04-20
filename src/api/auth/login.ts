// src/api/login.ts
import api from "../index";
import { LoginRequest, LoginResponse } from "../../types/auth";

/**
 * ログインAPI呼び出し
 * @param {LoginRequest} data メールアドレスとパスワード
 * @returns {Promise<LoginResponse>} ログイン成功時のレスポンスデータ
 */
export const loginUser = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  // <LoginResponse> と書くことで res.data の型が LoginResponse になる
  const res = await api.post<LoginResponse>("/auth/login", data);
  return res.data;
};
