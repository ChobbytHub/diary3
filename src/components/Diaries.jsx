// src/components/Diaries.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Diaries() {
  const [diaries, setDiaries] = useState([]); // 仮のデータ用
  const navigate = useNavigate();

  useEffect(() => {
    // JWTトークンがない場合は、ログインページにリダイレクト
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/login");
    } else {
      // 仮のデータ（後でAPIで日記データを取得するように変更）
      setDiaries([
        { id: 1, date: "2025-04-01", content: "今日は良い一日だった。" },
        { id: 2, date: "2025-04-02", content: "気分がすぐれなかった。" },
        { id: 3, date: "2025-04-03", content: "新しい趣味を見つけた！" },
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
              <strong>{diary.date}</strong>: {diary.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
