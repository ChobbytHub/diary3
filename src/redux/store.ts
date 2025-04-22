// Redux Toolkit の configureStore をインポート
import { configureStore } from "@reduxjs/toolkit";
// RTK Query の diaryApi をインポート（API の設定）
import { diaryApi } from "../api/diaryApi";
// 日記データ管理のための diarySlice をインポート
import diaryReducer from "./slices/diarySlice";
// 日付選択管理のための selectedDateSlice をインポート
import selectedDateReducer from "./slices/selectedDateSlice";

// Redux ストアの作成
export const store = configureStore({
  reducer: {
    // 日記データに関連する reducer を追加
    diary: diaryReducer,
    // 選択された日付に関連する reducer を追加
    selectedDate: selectedDateReducer,
    // RTK Query の `diaryApi` の reducer を追加
    // `diaryApi.reducerPath` は自動生成されるキーで、API エンドポイントに関連するステートを管理
    [diaryApi.reducerPath]: diaryApi.reducer,
  },
  // RTK Query のミドルウェアを追加
  // `getDefaultMiddleware` に `diaryApi.middleware` を追加することで、API キャッシュやエラーハンドリングなどを自動で管理
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(diaryApi.middleware),
});

// ストアの状態型を定義
export type RootState = ReturnType<typeof store.getState>;
// アプリケーションのディスパッチ型を定義
export type AppDispatch = typeof store.dispatch;

// 作成したストアをデフォルトエクスポート
export default store;
