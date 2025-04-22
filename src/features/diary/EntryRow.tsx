// src/features/diary/EntryRow.tsx
import { useState, useEffect } from "react";
import {
  useUpdateDiaryMutation,
  useAddDiaryMutation,
  useDeleteDiaryMutation,
} from "../../api/diaryApi";
import TextareaWithLabel from "../../components/ui/TextareaWithLabel";
import Button from "../../components/ui/Button";
import { EntryRowProps } from "../../types/diary";

export default function EntryRow({
  id,
  diaryDate,
  lineNumber,
  text,
}: EntryRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);
  const [error, setError] = useState<string | null>(null);

  const [addDiary,    { isLoading: isAdding }]   = useAddDiaryMutation();
  const [updateDiary, { isLoading: isUpdating }] = useUpdateDiaryMutation();
  const [deleteDiary, { isLoading: isDeleting }] = useDeleteDiaryMutation();

  // 親からtextが更新されたら同期
  useEffect(() => {
    setValue(text);
  }, [text]);

  const labels = [
    "",
    "✍️ 今日一番失敗したこと",
    "✨ 今日一番感動したこと",
    "🎯 明日の目標",
  ] as const;

  const handleSave = async () => {
    try {
      if (id) {
        await updateDiary({ id, text: value }).unwrap();
      } else {
        await addDiary({ diaryDate, lineNumber, text: value }).unwrap();
      }
      setIsEditing(false);
      setError(null);
    } catch {
      setError("保存に失敗しました。再度お試しください。");
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteDiary(id).unwrap();
      // 削除後は入力欄に戻す
      setValue("");
      setIsEditing(false);
      setError(null);
    } catch {
      setError("削除に失敗しました。");
    }
  };

  return (
    <div style={{ marginBottom: "0.5rem" }}>
      <strong>{labels[lineNumber]}</strong>

      {isEditing ? (
        <>
          <TextareaWithLabel
            value={value}
            onChange={(value: string) => setValue(value)}
            disabled={isAdding || isUpdating}
            placeholder="ここに入力…"
          />
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
            <Button onClick={handleSave} disabled={isAdding || isUpdating}>
              {isAdding || isUpdating ? "保存中…" : "保存"}
            </Button>
            <Button onClick={() => setIsEditing(false)} disabled={isAdding || isUpdating}>
              キャンセル
            </Button>
            {id && (
              <Button onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? "削除中…" : "削除"}
              </Button>
            )}
          </div>
        </>
      ) : (
        <p
          onClick={() => setIsEditing(true)}
          style={{ cursor: "pointer", whiteSpace: "pre-wrap" }}
        >
          {value || <em>未入力をタップして追加</em>}
        </p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
