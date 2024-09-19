"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getAllUsers } from "@/adminApi";
import { useGlobalContext } from "@/app/ContextProvider";
import { useRouter } from "next/navigation";
import placeholder from "../../../assets/placeholder.webp";
import { MdFilterList } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [filterOption, setFilterOption] = useState("name");
  const { user } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (user.role !== "admin") {
      router.push("/dashboard");
      return;
    }
    const fetchUsers = async () => {
      try {
        await getAllUsers(setUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [user.role, router]);

  const filteredUsers = users.filter((user) => {
    const userText =
      filterOption === "name"
        ? `${user.firstName} ${user.lastName}`
        : filterOption === "email"
        ? user.email
        : `${user.firstName} ${user.lastName}`;

    return userText.toLowerCase().includes(filterText.toLowerCase());
  });

  return (
    <div className="w-full h-max min-h-[60vh] flex flex-col gap-6 bg-white rounded-lg px-8 py-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="text-[28px] font-bold text-gray-800">Users</div>
        <div className="flex items-center gap-4">
          <div className="relative flex items-center">
            <IoMdSearch className="absolute left-3 text-gray-600 text-xl" />
            <input
              type="text"
              placeholder="Search..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-md text-gray-800 bg-white border-solid-1 border-gray-400 focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="relative">
            <select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-md bg-white text-gray-800 border-solid-1 border-gray-400 focus:outline-none focus:border-gray-500"
            >
              <option value="name">Name</option>
              <option value="email">Email</option>
            </select>
            <MdFilterList className="absolute left-3 text-gray-600 text-xl top-1/2 transform -translate-y-1/2" />
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full h-full border-collapse">
          <thead className="border-b border-solid border-gray-300">
            <tr>
              <th className="font-semibold text-gray-500 text-[16px] px-4 py-2">
                Avatar
              </th>
              <th className="font-semibold text-gray-500 text-[16px] px-4 py-2">
                Full Name
              </th>
              <th className="font-semibold text-gray-500 text-[16px] px-4 py-2">
                Email
              </th>
              <th className="font-semibold text-gray-500 text-[16px] px-4 py-2">
                Membership Plan
              </th>
              <th className="font-semibold text-gray-500 text-[16px] px-4 py-2">
                Membership Expiry
              </th>
              <th className="font-semibold text-gray-500 text-[16px] px-4 py-2">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={index}
                className="border-b border-gray-300 hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-3 px-4 text-center">
                  <Image
                    src={user.avatar || placeholder}
                    alt={`${user.firstName} ${user.lastName}`}
                    width={50}
                    height={50}
                    className="rounded-full object-cover object-center shadow-md"
                  />
                </td>
                <td className="py-3 px-4 text-black font-medium text-center truncate max-w-[150px]">
                  {`${user.firstName} ${user.lastName}`}
                </td>
                <td className="py-3 px-4 text-black font-normal text-center truncate max-w-[200px]">
                  {user.email}
                </td>
                <td className="py-3 px-4 text-black font-normal text-center truncate max-w-[150px]">
                  {user.subscription?.plan || "N/A"}
                </td>
                <td className="py-3 px-4 text-black font-normal text-center truncate max-w-[150px]">
                  {user.subscription?.expiresAt
                    ? new Date(user.subscription.expiresAt).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="py-3 px-4 text-center">
                  <button className="px-4 py-[5px] text-[14px] bg-black text-white rounded-full transition duration-200 shadow-sm">
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
