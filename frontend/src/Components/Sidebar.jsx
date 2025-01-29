import React, { useEffect, useState } from "react";
import { useChatStore } from "../Store/useChatStore";
import { useAuthStore } from "../Store/useAuthStore";
import { Users } from "lucide-react";
import SidebarSkeleton from "./Skeletons/SidebarSkeleton";

const UserAvatar = ({ profilePic, name, isOnline }) => (
  <div className="relative mx-auto lg:mx-0">
    <img
      src={profilePic || "/avatar.png"}
      alt={name}
      className="size-12 object-cover rounded-full"
    />
    {isOnline && (
      <span
        className="absolute bottom-0 right-0 size-3 bg-green-500 
        rounded-full border-0 ring-zinc-900"
      />
    )}
  </div>
);
const UserInfo = ({ fullName, isOnline }) => (
  <div className="hidden lg:block text-left min-w-0">
    <div className="font-medium truncate">{fullName}</div>
    <div className="text-sm text-zinc-400">
      {isOnline ? "Online" : "Offline"}
    </div>
  </div>
);
const OnlineFilter = ({ showOnlineOnly, setShowOnlineOnly }) => (
  <div className="mt-3 hidden lg:flex items-center gap-2">
    <input
      type="checkbox"
      checked={showOnlineOnly}
      onChange={(e) => setShowOnlineOnly(e.target.checked)}
      className="checkbox checkbox-sm mt-0.5"
    />
    <div className="text-sm ms-1">Show online only</div>
  </div>
);
const UserListItem = ({ user, isSelected, isOnline, onClick }) => (
  <button
    onClick={onClick}
    className={`
      w-full p-3 flex items-center gap-3
      hover:bg-base-300 transition-colors
      ${isSelected ? "bg-base-300 ring-1 ring-base-300 bg-gray-800 text-white" : ""}
    `}
  >
    <div className="w-[20%]">
      <UserAvatar
        profilePic={user.profilePic}
        name={user.name}
        isOnline={isOnline}
      />
    </div>
    <UserInfo fullName={user.fullName} isOnline={isOnline} />
  </button>
);
const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="bg-white h-full w-20 lg:w-72  border-base-300 flex flex-col transition-all duration-200 shadow">
      <header className="border-b border-base-300 w-full p-4">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="hidden lg:inline font-medium">Users</span>
        </div>
        <OnlineFilter
          showOnlineOnly={showOnlineOnly}
          setShowOnlineOnly={setShowOnlineOnly}
          onlineCount={onlineUsers.length - 1}
        />
      </header>

      <div className="overflow-y-auto w-full py-3 scrollbar-thin scrollbar-thumb-base-300">
        {filteredUsers.map((user) => (
          <UserListItem
            key={user._id}
            user={user}
            isSelected={selectedUser?._id === user._id}
            isOnline={onlineUsers.includes(user._id)}
            onClick={() => setSelectedUser(user)}
          />
        ))}
        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
