// src/contexts/DiaryContext.tsx
import { createContext } from "react";
import { Diary } from "../types/diary";

type DiaryContextType = {
  diaries: Diary[];
  setDiaries: (diaries: Diary[]) => void;
};

export const DiaryContext = createContext<DiaryContextType | undefined>(
  undefined
);
