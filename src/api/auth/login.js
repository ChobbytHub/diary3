import api from "../index";

/**
 * ログインAPI呼び出し
 * @param {string} email メールアドレス
 * @param {string} password パスワード
 * @returns {Promise<Object>} ログイン成功時のレスポンスデータ
 */
export const loginUser = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};
