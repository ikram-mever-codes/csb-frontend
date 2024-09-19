"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MdAttachMoney,
  MdBarChart,
  MdDashboard,
  MdSettings,
} from "react-icons/md";
import { usePathname } from "next/navigation";

// Custom hook to manage active links
const useActiveLink = () => {
  const pathname = usePathname();

  useEffect(() => {
    const dList = document.querySelectorAll("#d-list a");

    const removeAllActive = () => {
      dList.forEach((link) => link.classList.remove("d-list-active"));
    };

    const handleClick = (link) => {
      removeAllActive();
      link.classList.add("d-list-active");
    };

    dList.forEach((link) => {
      link.addEventListener("click", () => handleClick(link));
    });

    return () => {
      dList.forEach((link) => {
        link.removeEventListener("click", () => handleClick(link));
      });
    };
  }, [pathname]);

  return pathname;
};

const Dashboard = () => {
  const pathname = useActiveLink();

  return (
    <nav className="w-full h-screen gradient-background flex flex-col justify-start items-center overflow-hidden gap-[20px] sm:gap-[25px] md:gap-[30px]">
      <div className="py-[20px] sm:py-[25px] md:py-[30px]">
        <Link
          href="/"
          className="flex justify-center items-center flex-col"
          prefetch
        >
          <Image
            src="/logo-main.png"
            className="w-[50px] sm:w-[70px] md:w-[90px] h-auto"
            width={90}
            height={90}
            alt="CSB LOGO"
            priority
          />
          <h1 className="hidden sm:block font-bold text-white text-[16px] sm:text-[20px] md:text-[24px]">
            CARSALESBOOST
          </h1>
        </Link>
      </div>
      <ul className="w-full h-full" id="d-list">
        <li className="text-white">
          <Link
            href="/dashboard"
            className={`flex justify-center sm:justify-start items-center py-[10px] px-[10px] sm:py-[15px] sm:px-[20px] md:py-[18px] md:px-[25px] ${
              pathname === "/dashboard" ? "d-list-active" : ""
            }`}
            aria-current={pathname === "/dashboard" ? "page" : undefined}
            prefetch
          >
            <MdDashboard className="text-[22px] sm:text-[26px] md:text-[28px] w-[22px] sm:w-[26px] md:w-[28px] mr-[10px]" />
            <span className="hidden sm:block text-[14px] sm:text-[16px] md:text-[18px]">
              Dashboard
            </span>
          </Link>
        </li>
        <li className="text-white">
          <Link
            href="/posts"
            className={`flex justify-center sm:justify-start items-center py-[10px] px-[10px] sm:py-[15px] sm:px-[20px] md:py-[18px] md:px-[25px] ${
              pathname === "/posts" ? "d-list-active" : ""
            }`}
            aria-current={pathname === "/posts" ? "page" : undefined}
            prefetch
          >
            <MdBarChart className="text-[22px] sm:text-[26px] md:text-[28px] w-[22px] sm:w-[26px] md:w-[28px] mr-[10px]" />
            <span className="hidden sm:block text-[14px] sm:text-[16px] md:text-[18px]">
              All Posts
            </span>
          </Link>
        </li>
        <li className="text-white">
          <Link
            href="/pricing"
            className={`flex justify-center sm:justify-start items-center py-[10px] px-[10px] sm:py-[15px] sm:px-[20px] md:py-[18px] md:px-[25px] ${
              pathname === "/pricing" ? "d-list-active" : ""
            }`}
            aria-current={pathname === "/pricing" ? "page" : undefined}
            prefetch
          >
            <MdAttachMoney className="text-[22px] sm:text-[26px] md:text-[28px] w-[22px] sm:w-[26px] md:w-[28px] mr-[10px]" />
            <span className="hidden sm:block text-[14px] sm:text-[16px] md:text-[18px]">
              Memberships
            </span>
          </Link>
        </li>
        <li className="text-white">
          <Link
            href="/settings"
            className={`flex justify-center sm:justify-start items-center py-[10px] px-[10px] sm:py-[15px] sm:px-[20px] md:py-[18px] md:px-[25px] ${
              pathname === "/settings" ? "d-list-active" : ""
            }`}
            aria-current={pathname === "/settings" ? "page" : undefined}
            prefetch
          >
            <MdSettings className="text-[22px] sm:text-[26px] md:text-[28px] w-[22px] sm:w-[26px] md:w-[28px] mr-[10px]" />
            <span className="hidden sm:block text-[14px] sm:text-[16px] md:text-[18px]">
              Settings
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Dashboard;
