import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';      // 未ログイン時のトップページ
import Signup from './components/Signup';  // サインアップ画面
import Login from './components/Login';    // ログイン画面
import Diaries from './components/Diaries';// 日記一覧画面

function App() {
  const isAuthenticated = !!localStorage.getItem("jwt"); // JWT の有無で認証判定

  return (
    <Router basename="/diary3">
      <Routes>
        {/* ルート `/` */}
        <Route
          path="/"
          element={
            isAuthenticated
              ? <Diaries />  // ログイン済みなら日記一覧を表示
              : <Home />     // 未ログインならホームを表示
          }
        />

        {/* サインアップ / ログインは `/signup`・`/login` に分けてもOK */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login"  element={<Login />} />

        {/* 404 */}
        <Route path="*" element={<div>404 - ページが見つかりません</div>} />
      </Routes>
    </Router>
  );
}

export default App;