import api from "../index";

/**
 * サインアップAPI呼び出し
 * @param {string} email メールアドレス
 * @param {string} password パスワード
 * @returns {Promise<Object>} サインアップ成功時のレスポンスデータ
 */
export const signupUser = async (email, password) => {
  const res = await api.post("/auth/signup", { email, password });
  return res.data;
};
