// src/redux/slices/diarySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Diary } from "../../types/diary";

// 🧠 DiaryState：Reduxストアで管理する日記データの集合を表す型
interface DiaryState {
  diaries: Diary[]; // 取得または作成されたすべての日記データを保持
}

// 📦 初期状態：日記リストは空配列からスタート
const initialState: DiaryState = {
  diaries: [],
};

// ✏️ diarySlice：日記に関する状態（diaries配列）とその操作を定義するスライス
const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    /**
     * setDiaries：APIなどから取得した日記リストを丸ごと置き換え
     * @param action.payload Diary[] - 新しい日記データの配列
     */
    setDiaries: (state, action: PayloadAction<Diary[]>) => {
      state.diaries = action.payload;
    },

    /**
     * addDiary：新規作成した日記を既存リストに追加
     * @param action.payload Diary - 作成された日記オブジェクト
     */
    addDiary: (state, action: PayloadAction<Diary>) => {
      state.diaries.push(action.payload);
    },

    /**
     * updateDiary：特定の日記を更新
     * @param action.payload Diary - 更新後の日記オブジェクト（同一IDを持つ）
     */
    updateDiary: (state, action: PayloadAction<Diary>) => {
      const index = state.diaries.findIndex(
        (d) => d.id === action.payload.id
      );
      if (index !== -1) {
        state.diaries[index] = action.payload;
      }
    },

    /**
     * deleteDiary：指定IDの日記をリストから削除
     * @param action.payload number - 削除対象の日記ID
     */
    deleteDiary: (state, action: PayloadAction<number>) => {
      state.diaries = state.diaries.filter(
        (d) => d.id !== action.payload
      );
    },
  },
});

// 🛠️ エクスポートするアクションクリエーター
export const { setDiaries, addDiary, updateDiary, deleteDiary } =
  diarySlice.actions;

// 🏷️ デフォルトエクスポート：このスライサーのリデューサー
export default diarySlice.reducer;
