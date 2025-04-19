// src/App.jsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";  // 追加
import SignupPage from "./pages/SignupPage";  // 追加

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />  {/* 追加 */}
      <Route path="/signup" element={<SignupPage />} />  {/* 追加 */}
      <Route path="*" element={<div>404 - ページが見つかりません</div>} />
    </Routes>
  );
}
