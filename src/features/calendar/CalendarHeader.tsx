// src/features/calendar/CalendarHeader.tsx
import React from "react";
import {
  addMonths,
  subMonths,
  format,
  isSameMonth,
  subYears,
} from "date-fns";
import { getLocalToday } from "../../utils/dateHelpers";

type Props = {
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
};

const CalendarHeader: React.FC<Props> = ({ currentMonth, setCurrentMonth }) => {
  const today = getLocalToday();
  const oneYearAgo = subYears(today, 1);

  const canGoPrev = !isSameMonth(currentMonth, oneYearAgo);
  const canGoNext = !isSameMonth(currentMonth, today);

  const handlePrev = () => {
    if (canGoPrev) setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNext = () => {
    if (canGoNext) setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <div className="calendar-header">
      <button onClick={handlePrev} disabled={!canGoPrev}>
        {"<"}
      </button>
      <span>{format(currentMonth, "yyyy年M月")}</span>
      <button onClick={handleNext} disabled={!canGoNext}>
        {">"}
      </button>
    </div>
  );
};

export default CalendarHeader;
