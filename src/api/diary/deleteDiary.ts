import api from "../index";

/**
 * 指定IDの日記を削除
 * @param id 日記のID
 * @returns Promise<void>
 */
export const deleteDiary = async (id: number): Promise<void> => {
  try {
    // レスポンスボディは空なのでジェネリックに void を指定
    await api.delete<void>(`/diaries/${id}`);
    console.log(`日記ID ${id} が削除されました。`);
  } catch (error) {
    console.error("日記削除に失敗しました", error);
    // 失敗した場合のエラーハンドリングや通知を追加できます
    throw new Error("日記削除に失敗しました");
  }
};
