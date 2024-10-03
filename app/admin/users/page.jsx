"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getAllUsers } from "@/adminApi";
import { useGlobalContext } from "@/app/ContextProvider";
import { useRouter } from "next/navigation";
import placeholder from "../../../assets/placeholder.webp";
import { MdFilterList } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import Link from "next/link";

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
    <div className="w-full h-max min-h-[60vh] flex flex-col gap-6 bg-white rounded-lg px-4 py-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="text-[28px] font-bold text-gray-800">Users</div>
        <div className="items-center gap-4 hidden md:flex">
          <div className="relative  items-center flex">
            <IoMdSearch className="absolute left-3 text-gray-600 text-xl" />
            <input
              type="text"
              placeholder="Search..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-md text-gray-800 bg-white border-gray-400 focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="relative">
            <select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-md bg-white text-gray-800 border-gray-400 focus:outline-none focus:border-gray-500"
            >
              <option value="name">Name</option>
              <option value="email">Email</option>
            </select>
            <MdFilterList className="absolute left-3 text-gray-600 text-xl top-1/2 transform -translate-y-1/2" />
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse hidden md:table">
          <thead className="border-b border-gray-300">
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
                    className="rounded-full object-cover shadow-md"
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
                  <Link
                    href={`/user/${user._id}`}
                    className="px-4 py-2 text-[14px] bg-black text-white rounded-full transition duration-200 shadow-sm"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="md:hidden flex flex-col gap-4">
          {filteredUsers.map((user, index) => (
            <div
              key={index}
              className="p-4 bg-white shadow-lg rounded-lg hover:bg-gray-50 transition duration-200"
            >
              <div className="flex items-center mb-2">
                <Image
                  src={user.avatar || placeholder}
                  alt={`${user.firstName} ${user.lastName}`}
                  width={50}
                  height={50}
                  className="rounded-full object-cover shadow-md mr-3"
                />
                <div className="flex flex-col">
                  <span className="text-black font-bold">{`${user.firstName} ${user.lastName}`}</span>
                  <span className="text-gray-600">{user.email}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">
                  Membership Plan: {user.subscription?.plan || "N/A"}
                </span>
                <span className="text-gray-500">
                  Expires:{" "}
                  {user.subscription?.expiresAt
                    ? new Date(user.subscription.expiresAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              <Link
                href={`/user/${user._id}`}
                className="mt-2 px-4 py-1 text-[14px] bg-black text-white rounded-full transition duration-200 shadow-sm"
              >
                Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
