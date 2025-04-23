import DateNavigation from "./DateNavigation";
import ThreeYearEntries from "./ThreeYearEntries";

/**
 * Diary：選択された日付の今年・昨年・一昨年の日記を表示
 */
export default function Diary() {
  return (
    <div>
      <DateNavigation />
      <ThreeYearEntries />
    </div>
  );
}
