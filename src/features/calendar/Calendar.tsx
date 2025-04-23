// src/features/calendar/Calendar.tsx
import React, { useState } from "react";
import { startOfMonth } from "date-fns";
import CalendarHeader from "./CalendarHeader";
import Weekdays from "./Weekdays";
import CalendarGrid from "./CalendarGrid";

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));

  return (
    <div className="calendar">
      <CalendarHeader
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
      <Weekdays />
      <CalendarGrid currentMonth={currentMonth} />
    </div>
  );
};

export default Calendar;
