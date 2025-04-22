import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

import Button from "../components/ui/Button";
import Diary from "../features/diary/Diary";

export default function LoggedIn() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

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
