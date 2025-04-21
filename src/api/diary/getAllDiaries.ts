// src/api/diary/getAllDiaries.ts
import api from "../index";
import type { Diary } from "../../types/diary";
import axios from "axios";

/**
 * 全日記を取得
 * @returns Promise<Diary[]> ユーザーの全日記データの配列
 * @throws 認証エラー・通信エラーなど
 */
export const getAllDiaries = async (): Promise<Diary[]> => {
  try {
    // Axios の request interceptor で Authorization ヘッダーが付与される想定なので、
    // ここではパスだけ指定
    const response = await api.get<Diary[]>("api/diaries");

    // 念のためレスポンス形式をチェック
    if (!Array.isArray(response.data)) {
      console.error("予期しないレスポンス形式:", response.data);
      throw new Error("サーバーから予期しない形式のデータが返却されました");
    }

    return response.data;
  } catch (err: unknown) {
    // Axios エラーかどうかで場合分け
    if (axios.isAxiosError(err)) {
      // 401 のときはログインが必要
      if (err.response?.status === 401) {
        throw new Error("認証情報が無効です。再度ログインしてください。");
      }
      console.error("Axios エラー:", err.response ?? err.message);
    } else {
      console.error("想定外のエラー:", err);
    }
    throw new Error("日記の取得に失敗しました");
  }
};
