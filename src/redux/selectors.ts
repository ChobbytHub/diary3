// src/redux/selectors.ts
import { RootState } from "../types/store";
import { Diary } from "../types/diary";

// 📌 指定された日付に対応する日記データを取得するセレクタ
export const selectDiaryByDate = (state: RootState, date: string): Diary | undefined => {
  return state.diary.diaries.find((d) => d.diaryDate === date);
};

// 📌 現在選択中の日付を取得するセレクタ
export const selectSelectedDate = (state: RootState): string => {
  return state.diary.selectedDate;
};

// 🆕 選択中の日付の過去2年分も含めた3年分のデータを取得
// redux/selectors.ts
export const selectThreeYearDiaries = (state: RootState): {
  diaryDate: string;
  diary: Partial<Diary>[]; // 最大3件
}[] => {
  const selectedDateStr = state.diary.selectedDate;
  const selectedDate = new Date(selectedDateStr);

  const formatDate = (date: Date): string => date.toISOString().split("T")[0];

  const cloneAndSetYear = (originalDate: Date, targetYear: number): Date => {
    const month = originalDate.getMonth();
    const day = originalDate.getDate();
    const cloned = new Date(targetYear, month, 1);
    cloned.setDate(day);
    return cloned;
  };

  const targetDates = [0, 1, 2].map((offset) => {
    const targetYear = selectedDate.getFullYear() - offset;
    const dateObj = cloneAndSetYear(selectedDate, targetYear);
    return formatDate(dateObj);
  });

  return targetDates.map((dateStr) => ({
    diaryDate: dateStr,
    diary: state.diary.diaries.filter((d) => d.diaryDate === dateStr),
  }));
};
