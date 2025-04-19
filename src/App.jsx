// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';      // 未ログイン / ログイン済み 両方を切り替える
import Signup from './components/Signup';  // サインアップ画面
import Login from './components/Login';    // ログイン画面

export default function App() {
  return (
    <Router basename="/diary3">
      <Routes>
        {/* ここで常に Home を表示。Home の中でログイン状態に応じた分岐を行う */}
        <Route path="/" element={<Home />} />

        {/* サインアップ／ログインは別パス */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login"  element={<Login />} />

        {/* 存在しないパスは 404 */}
        <Route path="*" element={<div>404 - ページが見つかりません</div>} />
      </Routes>
    </Router>
  );
}
