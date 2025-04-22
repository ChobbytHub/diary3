// src/api/deleteAccount.ts
import api from "./index";

export const deleteAccount = async () => {
  try {
    // Axiosのインスタンスを使ってDELETEリクエストを送る
    await api.delete("/api/me");
  } catch {
    // エラーが発生した場合はエラーメッセージをスロー
    throw new Error("アカウント削除に失敗しました");
  }
};
