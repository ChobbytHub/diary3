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
import { getLocalToday } from "../../utils/dateHelpers";
import { setSelectedDate } from "../../redux/slices/selectedDateSlice";

type Props = {
  currentMonth: Date;
};

const CalendarGrid: React.FC<Props> = ({ currentMonth }) => {
  const today = getLocalToday();
  const dispatch = useAppDispatch();

  // Redux から日記データを取得
  const diaries = useAppSelector((state) => state.diary.diaries);

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
      const isToday = isSameDay(day, today);
      const dayStr = format(day, "yyyy-MM-dd");
      const hasDiary = diaryDatesSet.has(dayStr);

      cells.push(
        <div
          key={day.toISOString()}
          className={[
            "calendar-cell",
            "bg-white",
            "w-12 h-12 sm:w-16 sm:h-16",
            "border border-gray-300",
            "flex items-center justify-center",
            "text-sm sm:text-base",
            isDisabled ? "bg-gray-100 text-gray-400 cursor-default" : "cursor-pointer",
            isToday ? "border-2 border-blue-500" : "",
            hasDiary ? "bg-green-100" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => {
            if (!isDisabled) {
              dispatch(setSelectedDate(dayStr));
            }
          }}
        >
          <div className="relative">
            <span>{format(day, "d")}</span>
            {hasDiary && (
              <span className="absolute top-0 right-0 text-xs">✅</span>
            )}
          </div>
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
