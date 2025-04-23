// src/features/calendar/Weekdays.tsx
import React from "react";

const weekdays = ["月", "火", "水", "木", "金", "土", "日"];

const Weekdays: React.FC = () => {
  return (
    <div className="grid grid-cols-7 text-center font-semibold">
      {weekdays.map((day) => (
        <div key={day} className="py-2">
          {day}
        </div>
      ))}
    </div>
  );
};

export default Weekdays;
