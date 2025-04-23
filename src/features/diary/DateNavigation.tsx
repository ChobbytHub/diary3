// src/features/diary/DateNavigation.tsx

import Button from "../../components/ui/Button";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  incrementDate,
  decrementDate,
  setSelectedDate,
} from "../../redux/slices/selectedDateSlice";
import { toIsoString, fromIsoString } from "../../utils/dateUtils";
import { subYears, addYears, addDays, isAfter, isBefore, isSameDay } from "date-fns";

export default function DateNavigation() {
  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector((state) => state.selectedDate.value); // 現在選択されている日付（ISO文字列）
  const selected = fromIsoString(selectedDate); // ISO文字列をDate型に変換
  const today = new Date(); // 今日の日付（ローカル時間）

  // 「1年前の翌日」を計算（これより前には戻れない）
  const oneYearAgoTomorrow = addDays(subYears(today, 1), 1);

  // 「1年後」の日付（これより先には進めない）
  const oneYearLater = addYears(today, 1);

  // 「前日へ」ボタンが押せるのは、1年前の翌日より後の日付の場合
  const canDecrement = isAfter(selected, oneYearAgoTomorrow);

  // 「翌日へ」ボタンが押せるのは、1年後より前の日付の場合
  const canIncrement = isBefore(selected, oneYearLater);

  // 「今日」ボタンを押したときの処理：日付を今日にリセット
  const handleToday = () => {
    dispatch(setSelectedDate(toIsoString(today)));
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", margin: "1rem 0" }}>
      {/* 「前日へ」ボタン：条件により無効化 */}
      <Button onClick={() => dispatch(decrementDate())} disabled={!canDecrement}>
        ← 前日へ
      </Button>

      {/* 「今日」ボタン：すでに今日が選択されている場合は無効化 */}
      <Button onClick={handleToday} disabled={isSameDay(selected, today)}>
        今日
      </Button>

      {/* 「翌日へ」ボタン：条件により無効化（今日より未来でも1年以内ならOK） */}
      <Button onClick={() => dispatch(incrementDate())} disabled={!canIncrement}>
        翌日へ →
      </Button>
    </div>
  );
}
