import React from "react";
import { useAuthStore } from "../../Store/useAuthStore";
import { Link } from "react-router-dom";
import { BsChatHeartFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-white shadow-sm ">
      <div className="max-w-6xl mx-auto px-3 py-3">
        <nav className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <BsChatHeartFill className="fs-3" />
            <h1 className="fs-3 font-bold text-emerald-600">TalkEase</h1>
          </Link>
          {authUser && (
            <div className="flex items-center gap-6">
              <Link
                to="/profile"
                className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors"
              >
                <FaUser className="text-lg" />
                <span className="font-medium">Profile</span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors"
              >
                <IoIosLogOut className="text-xl" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
