"use client";

import ChangePassword from "@/Components/ChangePassword";
import Token from "@/Components/Token";
import React, { useEffect, useState } from "react";
import EditProfile from "../../Components/EditProfile";
import { useGlobalContext } from "../ContextProvider";
import { useRouter } from "next/navigation";

const Page = () => {
  const { user, setUser } = useGlobalContext();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("edit-profile");

  const getTabFromQuery = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("tab") || "edit-profile";
    }
    return "edit-profile";
  };

  useEffect(() => {
    const currentTab = getTabFromQuery();
    setActiveTab(currentTab);
  }, [router]);

  useEffect(() => {
    const sList = document.querySelectorAll("#settings-ul li");
    const removeAllActive = () => {
      sList.forEach((li) => {
        li.classList.remove("settings-active");
      });
    };

    sList.forEach((li) => {
      li.addEventListener("click", () => {
        removeAllActive();
        li.classList.add("settings-active");
      });
    });

    return () => {
      sList.forEach((li) => {
        li.removeEventListener("click", () => {
          removeAllActive();
          li.classList.add("settings-active");
        });
      });
    };
  }, []);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    const newUrl = `${window.location.pathname}?tab=${newTab}`;
    router.push(newUrl);
  };

  return (
    <div className="w-full min-h-[80vh] h-max md:px-[10px]">
      <div className="w-full h-max flex justify-start items-start flex-col gap-[25px]">
        <div className="w-full h-max ">
          <ul
            className="flex justify-start items-center text-nowrap overflow-scroll hide-scrollbar"
            id="settings-ul"
          >
            <li
              className={`text-[16px] px-[10px] cursor-pointer sm:text-[18px] sm:px-[20px] ${
                activeTab === "edit-profile" ? "settings-active" : ""
              }`}
              onClick={() => handleTabChange("edit-profile")}
            >
              Edit Profile
            </li>
            <li
              className={`text-[16px] px-[10px] cursor-pointer sm:text-[18px] sm:px-[20px] ${
                activeTab === "change-password" ? "settings-active" : ""
              }`}
              onClick={() => handleTabChange("change-password")}
            >
              Change Password
            </li>
            <li
              className={`text-[16px] px-[10px] cursor-pointer sm:text-[18px] sm:px-[20px] ${
                activeTab === "token" ? "settings-active" : ""
              }`}
              onClick={() => handleTabChange("token")}
            >
              API Tokens
            </li>
          </ul>
        </div>
      </div>
      <div className="py-[20px] w-full h-full">
        {activeTab === "edit-profile" && (
          <EditProfile user={user} setUser={setUser} />
        )}
        {activeTab === "change-password" && <ChangePassword />}
        {activeTab === "token" && <Token />}
      </div>
    </div>
  );
};

export default Page;
