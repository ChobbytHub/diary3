// src/api/signup.ts
import api from "../index";
import { SignupRequest, SignupResponse } from "../../types/auth";

/**
 * サインアップAPI呼び出し
 * @param {SignupRequest} data メールアドレスとパスワード
 * @returns {Promise<SignupResponse>} サインアップ成功時のレスポンスデータ
 */
export const signupUser = async (
  data: SignupRequest
): Promise<SignupResponse> => {
  const res = await api.post<SignupResponse>("/auth/signup", data);
  return res.data;
};
