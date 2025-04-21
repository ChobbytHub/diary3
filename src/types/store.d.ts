// src/types/store.d.ts
import { store } from "../redux/store";

// RootState 型を定義
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch 型を定義
export type AppDispatch = typeof store.dispatch;
