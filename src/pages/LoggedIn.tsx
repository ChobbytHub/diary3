import { useEffect } from "react";
import { useGetDiariesQuery } from "../api/diaryApi";
import { useAppDispatch } from "../redux/hooks";
import { setDiaries } from "../redux/slices/diarySlice";
import Diary from "../features/diary/Diary";
import DeleteAccountButton from "../features/user/DeleteAccountButton";
import LogoutButton from "../features/auth/LogoutButton";
import Calendar from "../features/calendar/Calendar";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Spinner from "../components/ui/Spinner";

// エラーが FetchBaseQueryError かどうかを判定する型ガード
function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === "object" && error !== null && "status" in error;
}

export default function LoggedIn() {
  const dispatch = useAppDispatch();
  const {
    data: diaries = [],
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetDiariesQuery();

  // データ取得成功時に Redux に保存
  useEffect(() => {
    if (isSuccess && diaries.length > 0) {
      dispatch(setDiaries(diaries));
    }
  }, [isSuccess, diaries, dispatch]);

  // ローディング中の表示
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner sizeClass="h-12 w-12" colorClass="border-green-500" />
      </div>
    );
  }

  // エラー発生時の表示
  if (isError) {
    return (
      <div>
        <p>日記データの取得に失敗しました。</p>
        {isFetchBaseQueryError(error) && <p>エラーコード: {error.status}</p>}
        <LogoutButton />
      </div>
    );
  }

  return (
    <div>
      <h2>ようこそ、ログインしています！</h2>
      <LogoutButton />
      <DeleteAccountButton />
      <Calendar />
      <Diary />
    </div>
  );
}
