// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import diaryReducer from "./diarySlice";

// ストアの作成
export const store = configureStore({
  reducer: {
    diary: diaryReducer,
  },
});

export default store;
