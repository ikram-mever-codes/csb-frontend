import { logout } from "@/api";
import Link from "next/link";
import React from "react";
import { MdAccountCircle, MdDashboard, MdHelp, MdLogout } from "react-icons/md";

const UserMenu = ({ router, setUser }) => {
  const handleLogout = async () => {
    await logout(router, setUser);
  };

  return (
    <div className="absolute top-[111%] right-0 w-[240px] bg-white rounded-lg p-4 shadow-xl border border-gray-200 z-[10000]">
      <ul className="flex flex-col">
        <li className="border-b border-gray-300">
          <Link
            href={"/dashboard"}
            className="flex items-center gap-3 p-3 transition-all duration-200 hover:bg-[#f1f4fa]"
          >
            <MdDashboard className="text-[24px] text-[#B82724]" />
            <span className="text-[16px] font-medium text-gray-800">
              Dashboard
            </span>
          </Link>
        </li>

        <li className="border-b border-gray-300">
          <Link
            href={"/profile"}
            className="flex items-center gap-3 p-3 transition-all duration-200 hover:bg-[#f1f4fa]"
          >
            <MdAccountCircle className="text-[24px] text-[#B82724]" />
            <span className="text-[16px] font-medium text-gray-800">
              Profile
            </span>
          </Link>
        </li>

        <li className="border-b border-gray-300">
          <Link
            href={"/support"}
            className="flex items-center gap-3 p-3 transition-all duration-200 hover:bg-[#f1f4fa]"
          >
            <MdHelp className="text-[24px] text-[#B82724]" />
            <span className="text-[16px] font-medium text-gray-800">
              Support
            </span>
          </Link>
        </li>

        <li className="mt-3">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full p-3 rounded-full bg-gradient-to-r from-[#E36C40] to-[#B82724] text-white font-semibold transition-all duration-200 hover:from-[#B82724] hover:to-[#E36C40]"
          >
            <MdLogout className="text-[20px]" />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
