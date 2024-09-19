"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MdAnalytics,
  MdAttachMoney,
  MdBarChart,
  MdDashboard,
  MdPeople,
  MdSettings,
} from "react-icons/md";
import { usePathname } from "next/navigation";

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

const AdminDashboard = () => {
  const pathname = useActiveLink();

  return (
    <nav className="w-full h-screen gradient-background flex flex-col justify-start items-center overflow-hidden overflow-y-auto">
      <div className="py-[30px]">
        <Link
          href="/"
          className="flex justify-center items-center flex-col"
          prefetch
        >
          <Image
            src="/logo-main.png"
            className="w-[80px] h-max object-cover object-center sm:w-[120px]"
            width={100}
            height={100}
            alt="CSB LOGO"
            priority
          />
          <h1 className="hidden sm:block font-bold text-white text-[25px]">
            CARSALESBOOST
          </h1>
        </Link>
      </div>
      <ul className="w-full h-full" id="d-list">
        <li>
          <Link
            href="/dashboard"
            className={`flex items-center gap-[15px] py-[15px] px-[20px] sm:px-[50px] text-white ${
              pathname === "/dashboard" ? "d-list-active" : ""
            }`}
            aria-current={pathname === "/dashboard" ? "page" : undefined}
            prefetch
          >
            <MdDashboard className="text-[30px]" />
            <span className="hidden sm:block text-[20px]">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            href="/sales"
            className={`flex items-center gap-[15px] py-[15px] px-[20px] sm:px-[50px] text-white ${
              pathname === "/sales" ? "d-list-active" : ""
            }`}
            aria-current={pathname === "/sales" ? "page" : undefined}
            prefetch
          >
            <MdBarChart className="text-[30px]" />
            <span className="hidden sm:block text-[20px]">Sales</span>
          </Link>
        </li>
        <li>
          <Link
            href="/pricing"
            className={`flex items-center gap-[15px] py-[15px] px-[20px] sm:px-[50px] text-white ${
              pathname === "/pricing" ? "d-list-active" : ""
            }`}
            aria-current={pathname === "/pricing" ? "page" : undefined}
            prefetch
          >
            <MdAttachMoney className="text-[30px]" />
            <span className="hidden sm:block text-[20px]">Pricings</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/users"
            className={`flex items-center gap-[15px] py-[15px] px-[20px] sm:px-[50px] text-white ${
              pathname === "/users" ? "d-list-active" : ""
            }`}
            aria-current={pathname === "/users" ? "page" : undefined}
            prefetch
          >
            <MdPeople className="text-[30px]" />
            <span className="hidden sm:block text-[20px]">Users</span>
          </Link>
        </li>

        <li>
          <Link
            href="/settings"
            className={`flex items-center gap-[15px] py-[15px] px-[20px] sm:px-[50px] text-white ${
              pathname === "/settings" ? "d-list-active" : ""
            }`}
            aria-current={pathname === "/settings" ? "page" : undefined}
            prefetch
          >
            <MdSettings className="text-[30px]" />
            <span className="hidden sm:block text-[20px]">Settings</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminDashboard;
