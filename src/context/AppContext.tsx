// src/context/AppContext.tsx
'use client';

import { User, onAuthStateChanged } from "firebase/auth";
import React, { ReactNode, createContext, useEffect, useState, useContext } from "react";
import { auth } from "../../firebase";

// 型定義
type AppProviderProps = {
  children: ReactNode;
};

type AppContextType = {
  user: User | null;
  userId: string | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  selectedRoom: string | null;
  setSelectedRoom: React.Dispatch<React.SetStateAction<string | null>>;
};

// デフォルトのコンテキストデータを定義
const defalutContextData = {
  user: null,
  userId: null,
  setUser: () => {},
  selectedRoom: null,
  setSelectedRoom: () => {},
};

// コンテキストを作成、型付けを行う
const AppContext = createContext<AppContextType>(defalutContextData);

// ユーザー情報や選択中のルーム情報を保持するコンテキストを定義
export function AppProvider({ children }: AppProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<any | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<any | null>(null);

  useEffect(() => {
    // 常にログイン状態を監視
    // アンマウント時に監視を解除
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      setUser(newUser);
      setUserId(newUser ? newUser.uid : null);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // グローバルに使用する変数を定義
  return (
    // プロバイダを使用して、コンテキストを提供
    <AppContext.Provider
      value={{
        user,
        setUser,
        userId,
        selectedRoom,
        setSelectedRoom,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// カスタムフックを作成
export function useAppContext() {
    return useContext(AppContext);
};