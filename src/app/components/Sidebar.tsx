// src/app/components/Sidebar.tsx

"use client";

import {
  Timestamp,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { db } from "../../../firebase";
import { useAppContext } from "@/context/AppContext";

type Room = {
  id: string;
  name: string;
  createdAt: Timestamp;
};

function Sidebar() {
  // グローバル変数に定義済みのユーザー情報を取得
  const {user, userId} = useAppContext();

  const [rooms, setRooms] = useState<Room[]>([]);
  useEffect(() => {
    if (user) {
    const fetchRooms = async () => {
      const roomCollection = collection(db, "rooms");
      // orderByでcreatedAtフィールドを基準に昇順でソート
      // where句でuserIdがログインユーザーのものだけを取得、複合クエリを使用
      const q = query(
        roomCollection,
        where("userId", "==", userId),
        orderBy("createdAt"),
      );
      // リアルタイムでデータを取得するためにonSnapshotを使用
      // onSnapshotはコレクションの変更を監視し、変更があるたびにコールバック関数を呼び出す
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newRooms: Room[] = snapshot.docs.map((doc) => ({
          // ドキュメントに割り当てたIDを取得
          // スプレッド構文のままだと型エラーが発生するため、データを明示的に取得
          id: doc.id,
          name: doc.data().name,
          createdAt: doc.data().createdAt,
        }));

        setRooms(newRooms);

        // アンマウント時に監視を解除
        return () => {
          unsubscribe();
        };
      });
    };
    fetchRooms();

    }
  }, [userId]);

  return (
    <div className="flex bg-custom-blue h-full overflow-y-auto px-5 flex-col">
      <div className="flex-grow">
        <div className="cursor-pointer flex justify-evenly items-center border mt-2 rounded-md hover:bg-blue-800 duration-150">
          <span className="text-white p-4 text-2xl">+</span>
          <h1 className="text-white text-xl font-semibold">New Chat</h1>
        </div>
        <ul>
          {rooms.map((room) => (
            <li
              key={room.id}
              className="cursor-pointer border-b p-4 text-slate-100 hover:bg-slate-700 duration-150"
            >
              {room.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-evenly mb-2 cursor-pointer p-4 text-slate-100 hover:text-slate-600 duration-150">
        <FiLogOut />
        <span>ログアウト</span>
      </div>
    </div>
  );
}

export default Sidebar;
