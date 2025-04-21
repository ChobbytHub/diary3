// src/hooks/useAuth.ts
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { loginUser } from "../api/auth/login";
import { signupUser } from "../api/auth/signup";
import { useAsyncAction } from "./useAsyncAction";

export function useAuth() {
  const navigate = useNavigate();
  const { login, logout, jwt } = useContext(AuthContext);

  const loginAction = useAsyncAction(loginUser);
  const signupAction = useAsyncAction(signupUser);

  const handleLogin = async (email: string, password: string) => {
    const res = await loginAction.run({ email, password });
    if (res?.token) {
      login(res.token);
      navigate("/");
    }
  };

  const handleSignup = async (email: string, password: string) => {
    const res = await signupAction.run({ email, password });
    if (res) {
      return true; // 成功した場合にtrueを返す
    }
    return false;
  };

  return {
    login: handleLogin,
    signup: handleSignup,
    jwt,
    logout,
    loginLoading: loginAction.loading,
    loginError: loginAction.error,
    signupLoading: signupAction.loading,
    signupError: signupAction.error,
  };
}
