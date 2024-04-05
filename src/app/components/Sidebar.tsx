import React from "react";
import { FiLogOut } from "react-icons/fi";

function Sidebar() {
  return (
    <div className="flex bg-custom-blue h-full overflow-y-auto px-5 flex-col">
      <div className="flex-grow">
        <div className="cursor-pointer flex justify-evenly items-center border mt-2 rounded-md hover:bg-blue-800 duration-150">
          <span className="text-white p-4 text-2xl">+</span>
          <h1 className="text-white text-xl font-semibold">New Chat</h1>
        </div>
        <ul>
          <li className="cursor-pointer border-b p-4 text-slate-100 hover:bg-slate-700 duration-150">
            Room 1
          </li>
          <li className="cursor-pointer border-b p-4 text-slate-100 hover:bg-slate-700 duration-150">
            Room 2
          </li>
          <li className="cursor-pointer border-b p-4 text-slate-100 hover:bg-slate-700 duration-150">
            Room 3
          </li>
          <li className="cursor-pointer border-b p-4 text-slate-100 hover:bg-slate-700 duration-150">
            Room 4
          </li>
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
