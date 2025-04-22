// src/features/diary/Diary.tsx
import { useAppSelector } from "../../redux/hooks";
import { useGetDiariesQuery } from "../../api/diaryApi";
import DateNavigation from "./DateNavigation";
import YearGroup from "./YearGroup";
import { toIsoString } from "../../utils/dateUtils";

/**
 * Diary：選択された日付の今年・昨年・一昨年の日記を表示
 */
export default function Diary() {
  // Redux から選択日（デフォルトは今日）を取得
  const selectedDate = useAppSelector((state) => state.selectedDate.value);

  // RTK Query で全日記を取得
  const { data: diaries = [], isLoading, isError } = useGetDiariesQuery();

  // 過去2年分から今年までの3年分を計算
  const threeYearEntries = [-2, -1, 0].map((yearOffset) => {
    const base = new Date(selectedDate);
    base.setFullYear(base.getFullYear() + yearOffset);
    const iso = toIsoString(base);

    // 該当日付の全lineNumber分のデータを取り出す
    const matched = diaries.filter((d) => d.diaryDate === iso);
    return { diaryDate: iso, diary: matched };
  });

  if (isLoading) return <p>読み込み中…</p>;
  if (isError) return <p>日記の取得に失敗しました。</p>;

  return (
    <div>
      {/* 日付操作ボタン群 */}
      <DateNavigation />

      {/* 古い日付順（第1要素＝一昨年、次＝昨年、最後＝今年）で表示 */}
      {threeYearEntries
        .sort((a, b) => a.diaryDate.localeCompare(b.diaryDate))
        .map(({ diaryDate, diary }) => (
          <YearGroup
            key={diaryDate}
            date={diaryDate}
            diary={diary}
          />
        ))}
    </div>
  );
}
