// src/components/Diaries.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Diary } from "../types/diary";

export default function Diaries() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/login");
    } else {
      // 仮データ（後でAPIに置き換える）
      setDiaries([
        { id: 1, diaryDate: "2025-04-01", lineNumber: 1, text: "今日は良い一日だった。" },
        { id: 2, diaryDate: "2025-04-02", lineNumber: 1, text: "気分がすぐれなかった。" },
        { id: 3, diaryDate: "2025-04-03", lineNumber: 1, text: "新しい趣味を見つけた！" },
      ]);
    }
  }, [navigate]);

  return (
    <div>
      <h2>日記一覧</h2>
      {diaries.length === 0 ? (
        <p>まだ日記がありません。</p>
      ) : (
        <ul>
          {diaries.map((diary) => (
            <li key={diary.id}>
              <strong>{diary.diaryDate}</strong>: {diary.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
