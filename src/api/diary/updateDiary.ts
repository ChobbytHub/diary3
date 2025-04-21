// src/api/diary/updateDiary.ts
import api from "../index";
import type { DiaryResponse } from "../../types/diary";

/**
 * 指定IDの日記を更新
 * @param id - 日記のID
 * @param data - 更新内容（textのみ）
 * @returns 更新された日記
 */
export const updateDiary = async (
  id: number,
  data: { text: string }
): Promise<DiaryResponse> => {
  // ← ここで <DiaryResponse> を指定しておくと
  // response.data の型が保証されます
  const response = await api.patch<DiaryResponse>(`/api/diaries/${id}`, data);
  return response.data;
};
