import { BsChatHeartFill } from "react-icons/bs";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-10 sm:p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div
              className="rounded-2xl bg-primary/10 flex items-center justify-center p-6 animate-bounce
                hover:scale-105 transition-transform duration-300"
            >
              <BsChatHeartFill className="text-primary text-5xl sm:text-6xl" />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-primary">Welcome to TalkEase</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          Select a conversation from the sidebar to start chatting.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
