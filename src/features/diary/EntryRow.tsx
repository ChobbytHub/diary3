import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateDiaryEntry } from "../../redux/diarySlice";
import TextareaWithLabel from "../../components/ui/TextareaWithLabel";
import Button from "../../components/ui/Button";
import { DiaryBase } from "../../types/diary";

export default function EntryRow({ diaryDate, lineNumber, text }: DiaryBase) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);

  const labels = [
    "",
    "✍️ 今日一番失敗したこと",
    "✨ 今日一番感動したこと",
    "🎯 明日の目標",
  ] as const;

  const handleSave = () => {
    dispatch(updateDiaryEntry({ diaryDate, lineNumber, text: value }));
    setIsEditing(false);
  };

  return (
    <div>
      <strong>{labels[lineNumber]}</strong>
      {isEditing ? (
        <>
          <TextareaWithLabel
            label=""
            value={value}
            onChange={setValue}
            placeholder="ここに入力…"
          />
          <Button onClick={handleSave}>保存</Button>
          <Button onClick={() => setIsEditing(false)}>キャンセル</Button>
        </>
      ) : (
        <p onClick={() => setIsEditing(true)} style={{ cursor: "pointer" }}>
          {text || <em>未入力をタップして追加</em>}
        </p>
      )}
    </div>
  );
}
