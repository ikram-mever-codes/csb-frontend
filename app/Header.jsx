import Image from "next/image";
import React from "react";
import {
  MdNotifications,
  MdOutlineNotifications,
  MdSearch,
} from "react-icons/md";

const Header = () => {
  return (
    <header className="w-full py-[20px] h-[5rem] flex justify-center items-start">
      <div className="w-[80%] px-[10px] h-full flex justify-center items-center">
        <form className=" w-[90%] h-[3.5rem] flex justify-start bg-white items-center gap-[5px] rounded-[20px] overflow-hidden shadow">
          <button
            type="submit"
            className="mx-[20px] scale-[1] hover:scale-[1.1] transition-transform"
          >
            <MdSearch className="text-[#D75938] text-[35px]" />
          </button>
          <input
            type="text"
            placeholder="Find Posts..."
            className="w-full h-full text-[20px] border-none outline-none bg-transparent"
          />
        </form>
      </div>
      <div className="w-[20%] flex justify-center items-center bg-red">
        <div className="w-full h-full flex justify-center items-center">
          <button className="border-none outline-none bg-none icon-hover">
            <MdOutlineNotifications className="text-5xl text-[#D55537]" />
          </button>
        </div>
        <div>
          <Image
            src="/car1.png"
            alt="avatar"
            width={10}
            height={10}
            className=""
          />
          <div></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
