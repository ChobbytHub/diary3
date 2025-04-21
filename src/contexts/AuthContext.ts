// AuthContext.tsx
import { createContext } from "react";
import { AuthContextType } from "../types/auth";

// 認証状態を保持・共有するためのコンテキストを作成
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);
