// src/contexts/DiaryProvider.tsx
import { useState } from "react";
import { Diary } from "../types/diary";
import { DiaryContext } from "./DiaryContext";
const DiaryProvider = ({ children }: { children: React.ReactNode }) => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  return (
    <DiaryContext.Provider value={{ diaries, setDiaries }}>
      {children}
    </DiaryContext.Provider>
  );
};

export default DiaryProvider;
