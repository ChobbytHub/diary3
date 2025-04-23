import React, { useMemo } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameDay,
} from "date-fns";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { isDateSelectable } from "../../utils/calendarUtils";
import { setSelectedDate } from "../../redux/slices/selectedDateSlice";

type Props = {
  currentMonth: Date;
};

const CalendarGrid: React.FC<Props> = ({ currentMonth }) => {
  const dispatch = useAppDispatch();

  // Redux から日記データを取得
  const diaries = useAppSelector((state) => state.diary.diaries);
  const selectedDate = useAppSelector((state) => state.selectedDate.value);

  // 日記のある日付だけを Set にまとめる
  const diaryDatesSet = useMemo(() => {
    return new Set<string>(diaries.map((d) => d.diaryDate));
  }, [diaries]);

  const startDate = startOfWeek(startOfMonth(currentMonth), {
    weekStartsOn: 1,
  });
  const endDate = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });

  const renderCalendarCells = (): React.ReactNode[] => {
    const cells: React.ReactNode[] = [];
    let day = startDate;

    while (day <= endDate) {
      const isDisabled = !isDateSelectable(day, currentMonth);
      const isSelected = selectedDate && isSameDay(day, new Date(selectedDate));

      const dayStr = format(day, "yyyy-MM-dd");
      const hasDiary = diaryDatesSet.has(dayStr);

      cells.push(
        <div
          key={day.toISOString()}
          className={[
            "calendar-cell",
            "relative",                          // ← ここでセル全体を相対位置コンテナに
            "h-12 w-12 sm:h-16 sm:w-16",
            "border border-gray-300",
            "flex items-center justify-center",  // ← 日付を中央に
            "text-sm sm:text-base",
            !isDisabled
              ? "cursor-pointer bg-white text-black"
              : "cursor-not-allowed bg-gray-300 text-gray-500",
            isSelected && "border-2 border-blue-500",
            hasDiary && "bg-green-100",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => {
            if (!isDisabled) {
              dispatch(setSelectedDate(dayStr));
            }
          }}
        >
          {/* 日付はこの span が flex で中央に配置 */}
          <span>{format(day, "d")}</span>

          {/* チェックマークはセル（relative）の右上に絶対配置 */}
          {hasDiary && (
            <span className="absolute top-1 right-1 text-xs">✅</span>
          )}
        </div>
      );

      day = addDays(day, 1);
    }

    return cells;
  };

  return (
    <div className="calendar-grid grid grid-cols-7 gap-px bg-gray-200">
      {renderCalendarCells()}
    </div>
  );
};

export default CalendarGrid;
