// src/redux/slices/selectedDateSlice.ts

// Redux Toolkit の createSlice を使って、アプリで選択中の日付を管理する slice を定義
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// 日付を ISO 形式の文字列 (YYYY-MM-DD) に変換するユーティリティ関数
import { toIsoString } from "../../utils/dateUtils";

// この slice で扱うステートの型定義
interface SelectedDateState {
  // ISO 文字列形式の日付 (例: "2025-04-20")
  value: string;
}

// 初期状態：現在の日付を ISO 形式で設定
const initialState: SelectedDateState = {
  value: toIsoString(new Date()),
};

// createSlice で名前、初期状態、reducer 関数群をまとめて定義
export const selectedDateSlice = createSlice({
  name: "selectedDate", // スライス名
  initialState, // 初期ステート
  reducers: {
    /**
     * @action setSelectedDate
     * @description 指定された dateStr (ISO 形式) を現在の selectedDate に設定
     */
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },

    /**
     * @action incrementDate
     * @description state.value を 1 日進める
     */
    incrementDate: (state) => {
      const d = new Date(state.value);
      d.setDate(d.getDate() + 1);
      state.value = toIsoString(d);
    },

    /**
     * @action decrementDate
     * @description state.value を 1 日戻す
     */
    decrementDate: (state) => {
      const d = new Date(state.value);
      d.setDate(d.getDate() - 1);
      state.value = toIsoString(d);
    },
  },
});

// アクション生成関数をエクスポート
export const { setSelectedDate, incrementDate, decrementDate } =
  selectedDateSlice.actions;

// slice の reducer をデフォルトエクスポート
export default selectedDateSlice.reducer;
