// src/hooks/useDiaries.ts
import { useState, useEffect, useCallback } from "react";
import { getAllDiaries } from "../api/diary/getAllDiaries";
import { postDiary }     from "../api/diary/postDiary";
import { updateDiary }   from "../api/diary/updateDiary";
import { deleteDiary }   from "../api/diary/deleteDiary";
import type { Diary, DiaryRequest } from "../types/diary";

export function useDiaries() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllDiaries();
      setDiaries(data);
    } catch (err) {
      console.error(err);
      setError("日記の取得に失敗しました");
    } finally {
      setLoading(false);
    }
  }, []);

  // 初回ロード
  useEffect(() => { refresh(); }, [refresh]);

  // ミューテーション
  const add = useCallback(
    async (entry: DiaryRequest) => {
      try {
        await postDiary(entry);
        await refresh();
      } catch (err) {
        console.error(err);
        setError("日記の作成に失敗しました");
      }
    },
    [refresh]
  );

  const edit = useCallback(
    async (id: number, entry: { text: string }) => {
      try {
        await updateDiary(id, entry);
        await refresh();
      } catch (err) {
        console.error(err);
        setError("日記の更新に失敗しました");
      }
    },
    [refresh]
  );

  const remove = useCallback(
    async (id: number) => {
      try {
        await deleteDiary(id);
        await refresh();
      } catch (err) {
        console.error(err);
        setError("日記の削除に失敗しました");
      }
    },
    [refresh]
  );

  return { diaries, loading, error, refresh, add, edit, remove };
}
