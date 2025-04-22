import { formatWithOptions } from "date-fns/fp";
import { ja } from "date-fns/locale"; // 日本語ロケールをインポート
import EntryRow from "./EntryRow";
import { YearGroupProps } from "../../types/diary";

export default function YearGroup({ date, diary }: YearGroupProps) {
  // Dateオブジェクトにパース
  const parsed = new Date(date);

  // "EEE" はロケールに応じた曜日の省略名を出すトークン
  // jaロケールを渡すことで "日","月" など日本語一文字での曜日表示に
  const title = formatWithOptions(
    { locale: ja },
    "yyyy年M月d日（EEE）"
  )(parsed);

  return (
    <section>
      <h3>{title}</h3>
      {[1, 2, 3].map((lineNumber) => {
        // 対応するlineNumberのデータを探す
        const found = diary.find(
          (d) => d.lineNumber === (lineNumber as 1 | 2 | 3)
        );
        return (
          <EntryRow
            key={lineNumber}
            id={found?.id}
            diaryDate={date}
            lineNumber={lineNumber as 1 | 2 | 3} // 型キャストを追加
            text={found?.text ?? ""} // textが存在しない場合は空文字
          />
        );
      })}
    </section>
  );
}
