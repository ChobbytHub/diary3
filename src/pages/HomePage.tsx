// src/pages/HomePage.tsx
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "../contexts/AuthContext";
import Diary from "../features/diary/Diary";
import Button from "../components/ui/Button";
import { getAllDiaries } from "../api/diary/getAllDiaries";
import { setDiaries } from "../redux/diarySlice";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>ようこそ！</h2>
      <Button onClick={() => navigate("/signup")}>新規登録</Button>
      <Button onClick={() => navigate("/login")}>ログイン</Button>
    </div>
  );
}

function LoggedIn() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h2>ようこそ、ログインしています！</h2>
      <Button onClick={handleLogout}>ログアウト</Button>
      <Diary />
    </div>
  );
}

export default function HomePage() {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { jwt } = useAuth();

  useEffect(() => {
    if (!jwt) return; // ← トークンがなければ何もしない（リダイレクトでもOK）

    const fetchDiaries = async () => {
      try {
        const data = await getAllDiaries();
        dispatch(setDiaries(data));
      } catch (err) {
        console.error("日記の取得に失敗しました", err);
      }
    };

    fetchDiaries();
  }, [jwt, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>{!isAuthenticated ? <Welcome /> : <LoggedIn />}</div>;
}
