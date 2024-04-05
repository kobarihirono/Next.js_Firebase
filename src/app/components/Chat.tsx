import React from "react";
import { IoPaperPlane } from "react-icons/io5";

function Chat() {
  return (
    <div className="bg-gray-500 h-full p-4 flex flex-col">
      <h1 className="text-2xl text-white font-semibold mb-4">Room 1</h1>
      <div className="flex-grow overflow-y-auto mb-4">
        <div className="text-right">
          <div className="bg-blue-500 inline-block rounded px-4 py-2 mb-2">
            <p className="text-white">Hello</p>
          </div>
        </div>
        <div className="text-left">
          <div className="bg-green-500 inline-block rounded px-4 py-2 mb-2">
            <p className="text-white">How are you?</p>
          </div>
        </div>
      </div>

      <div className="flex-shrink-9 relative">
        <input
          type="text"
          className="w-full border-2 rounded pr-10 focus:outline-none p-2"
          placeholder="Send a message"
        />
        <button className="absolute inset-y-0 right-4 flex items-center">
          <IoPaperPlane />
        </button>
      </div>
    </div>
  );
}

export default Chat;
