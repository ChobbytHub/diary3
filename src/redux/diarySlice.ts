// src/redux/diarySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Diary, DiaryState, UpdateDiaryPayload } from "../types/diary";

// 📌 グローバルステートの初期値
const initialState: DiaryState = {
  diaries: [],
  selectedDate: new Date().toISOString().split("T")[0], // 今日の日付
};

// 📌 Redux ToolkitのcreateSliceでステートとアクションを定義
const diarySlice = createSlice({
  name: "diary", // スライス名
  initialState,
  reducers: {
    // ✅ サーバーなどから取得した全日記データを保存
    setDiaries: (state, action: PayloadAction<Diary[]>) => {
      state.diaries = action.payload;
    },

    // ✅ 現在選択されている日付を設定
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },

    // ✅ 指定した日付・行番号に対応する日記内容を更新 or 新規作成
    updateDiaryEntry: (state, action: PayloadAction<UpdateDiaryPayload>) => {
      const { diaryDate, lineNumber, text } = action.payload;

      // 対象の日記を検索
      const existing = state.diaries.find(
        (d) => d.diaryDate === diaryDate && d.lineNumber === lineNumber
      );

      if (existing) {
        // 既存の日記があれば、その行の内容を更新
        existing.text = text;
      } else {
        // 既存の日記がなければ、新しい日記を作成
        state.diaries.push({
          diaryDate: diaryDate,
          lineNumber: lineNumber,
          text,
          id: Date.now() + Math.random(), // 仮ID（サーバー側で設定）
        });
      }
    },
  },
});

export const { setDiaries, setSelectedDate, updateDiaryEntry } =
  diarySlice.actions;

export default diarySlice.reducer;
