"use client";
import { useGlobalContext } from "@/app/ContextProvider";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import {
  MdHelpOutline,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineNotifications,
  MdSearch,
} from "react-icons/md";
import UserMenu from "./UserMenu";

const Header = () => {
  const { user, setUser } = useGlobalContext();
  const [userMenu, setUserMenu] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setUserMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full h-[5rem] flex justify-between items-center relative px-4 md:px-8">
      <div className="flex items-center justify-center  w-full">
        <form className="hidden md:flex w-[70vw] max-w-[500px] h-[3.5rem] items-center justify-center  gap-2 rounded-md overflow-hidden shadow bg-white">
          <button
            type="submit"
            className="mx-4 scale-100 hover:scale-110 transition-transform"
          >
            <MdSearch className="text-[#D75938] text-3xl" />
          </button>
          <input
            type="text"
            placeholder="Find Posts..."
            className="w-full h-full text-lg border-none outline-none bg-transparent p-2"
          />
        </form>

        <button
          type="submit"
          className="block md:hidden mx-2 scale-100 hover:scale-110 transition-transform"
        >
          <MdSearch className="text-[#D75938] text-3xl" />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button className="border-none outline-none bg-transparent">
          <MdOutlineNotifications className="text-2xl md:text-3xl text-[#D55537]" />
        </button>

        <Link href={"#"} className="border-none outline-none bg-transparent">
          <MdHelpOutline className="text-2xl md:text-3xl text-[#D55537]" />
        </Link>

        <div
          onClick={() => {
            document.querySelector("#user-menu").click();
          }}
          className="flex items-center gap-2 cursor-pointer relative"
        >
          <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full overflow-hidden">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt="avatar"
                width={50}
                height={50}
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-purple-700 text-white text-xl font-semibold rounded-full">
                {user.firstName[0]}
              </div>
            )}
          </div>

          <div className="hidden md:flex flex-col">
            <h3 className="text-sm md:text-base font-medium">
              {user.firstName}
            </h3>
            <p className="text-xs md:text-sm text-gray-600 truncate">
              {user.email.substring(0, 20)}...
            </p>
          </div>

          {/* Dropdown Arrow */}
          <div
            id="user-menu"
            onClick={() => {
              setUserMenu(!userMenu);
            }}
          >
            {userMenu ? (
              <MdKeyboardArrowUp className="text-xl md:text-2xl" />
            ) : (
              <MdKeyboardArrowDown className="text-xl md:text-2xl" />
            )}
          </div>

          {/* User Menu Dropdown */}
          <div ref={menuRef}>
            {userMenu && <UserMenu router={router} setUser={setUser} />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
