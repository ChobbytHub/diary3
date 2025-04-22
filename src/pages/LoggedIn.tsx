import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useGetDiariesQuery } from "../api/diaryApi";
import { useAppDispatch } from "../redux/hooks";
import { setDiaries } from "../redux/slices/diarySlice";
import { setSelectedDate } from "../redux/slices/selectedDateSlice";
import { toIsoString } from "../utils/dateUtils";

import Button from "../components/ui/Button";
import Diary from "../features/diary/Diary";

export default function LoggedIn() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const dispatch = useAppDispatch();

  // APIから日記データ取得
  const { data: diaries, isSuccess } = useGetDiariesQuery();

  // 初期表示時にデータをグローバルステートに保存
  useEffect(() => {
    if (isSuccess && diaries) {
      dispatch(setDiaries(diaries)); // 全日記を格納
      dispatch(setSelectedDate(toIsoString(new Date()))); // 今日の日付をセット
    }
  }, [isSuccess, diaries, dispatch]);

  return (
    <div>
      <h2>ようこそ、ログインしています！</h2>
      <Button
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        ログアウト
      </Button>
      <Diary />
    </div>
  );
}
