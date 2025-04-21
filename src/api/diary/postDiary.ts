// src/api/diary/postDiary.ts
import api from "../index";
import { DiaryRequest, DiaryResponse } from "../../types/diary";

/**
 * 日記を新規作成
 * @param diary - 作成する日記（lineNumber, text, diaryDate）
 * @returns 作成された日記データ
 */
export const postDiary = async (
  diary: DiaryRequest
): Promise<DiaryResponse> => {
  try {
    // <DiaryResponse> を指定して型を保証
    const response = await api.post<DiaryResponse>("/api/diaries", diary);
    return response.data;
  } catch (err) {
    console.error("日記作成エラー:", err);
    // 必要に応じて UI でトースト表示などを行ってください
    throw new Error("日記の作成に失敗しました");
  }
};
