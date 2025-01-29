import React from "react";
import { useChatStore } from "../../Store/useChatStore";
import Sidebar from "../../Components/Sidebar";
import NoChatSelected from "../../Components/NoChatSelected";
import ChatContainer from "../../Components/ChatContainer";

const Home = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen bg-base-200">
      <div className=" rounded-lg shadow-lg w-full  h-[100vh]">
        <div className="flex h-full rounded-lg overflow-hidden">
          <Sidebar />
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
};

export default Home;
