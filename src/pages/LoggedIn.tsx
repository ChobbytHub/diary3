import Diary from "../features/diary/Diary";
import DeleteAccountButton from "../features/user/DeleteAccountButton";
import LogoutButton from "../features/auth/LogoutButton";

export default function LoggedIn() {

  return (
    <div>
      <h2>ようこそ、ログインしています！</h2>
      <LogoutButton></LogoutButton>
      <DeleteAccountButton></DeleteAccountButton>
      <Diary />
    </div>
  );
}
