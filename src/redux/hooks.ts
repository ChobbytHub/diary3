import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// アプリ全体で型付きの dispatch を使うためのフック
export const useAppDispatch: () => AppDispatch = useDispatch;

// アプリ全体で型付きの selector を使うためのフック
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
