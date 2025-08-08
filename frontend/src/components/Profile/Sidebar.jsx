import React from "react";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Sidebar = ({ data }) => {
  if (!data) return <p className="text-white p-4">Loading...</p>;

  return (
    <div className="bg-zinc-800 p-4 rounded flex flex-col items-center h-full">
      {data.avatar ? (
        <img
          src={data.avatar.startsWith("http") ? data.avatar : `http://localhost:1000/${data.avatar}`}
          alt="User Avatar"
          className="h-[12vh] w-[12vh] rounded-full object-cover"
        />
      ) : (
        <div className="h-[12vh] w-[12vh] bg-zinc-600 rounded-full flex items-center justify-center text-zinc-300 text-xl">
          {data.username ? data.username[0].toUpperCase() : "?"}
        </div>
      )}

      <p className="mt-3 text-xl text-zinc-100 font-semibold">{data.username || "Guest"}</p>
      <p className="mt-1 text-sm text-zinc-400 font-medium">{data.email || "No email"}</p>

      <div className="w-full mt-4 h-[1px] bg-zinc-500"></div>

      <div className="w-full flex flex-col items-center mt-4">
        <Link
          to="/profile"
          className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all"
        >
          Favorites
        </Link>
        <Link
          to="/profile/orderHistory"
          className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all"
        >
          Order History
        </Link>
        <Link
          to="/profile/settings"
          className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all"
        >
          Settings
        </Link>

        <button
          className="bg-red-600 hover:bg-red-700 w-full py-2 mt-6 rounded text-white font-semibold flex items-center justify-center gap-2 transition-all"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          <FiLogOut size={18} />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
