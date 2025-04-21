import { useContext } from "react";
import { DiaryContext } from "../contexts/DiaryContext";

export const useDiaryStore = () => {
  const context = useContext(DiaryContext);
  if (!context) throw new Error("DiaryProviderが必要です");
  return context;
};
