"use client";
import React, { useState, useEffect } from "react";
import { getAllListings } from "@/api";
import facebook from "../../assets/facebook.png";
import wordpress from "../../assets/wordpress.png";
import Image from "next/image";
import { useGlobalContext } from "../ContextProvider";
import { useRouter } from "next/navigation";
const Page = () => {
  const [listings, setListings] = useState([]);
  const { user } = useGlobalContext();
  function formatDate(createdAt) {
    const date = new Date(createdAt);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  const router = useRouter();
  useEffect(() => {
    if (user.role === "admin") {
      router.push("/dashboard");
      return;
    }
    const fetchListings = async () => {
      try {
        await getAllListings(setListings);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchListings();
  }, []);

  return (
    <div className="w-full h-max min-h-[60vh] flex flex-col gap-6 bg-white rounded-lg px-8 py-6 shadow-lg">
      <div className="text-[24px] font-bold text-gray-800">Latest Posts</div>
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="border-b border-solid border-gray-300">
            <tr>
              <th className="font-semibold text-gray-600 text-[16px] px-4 py-2 text-left">
                Image
              </th>
              <th className="font-semibold text-gray-600 text-[16px] px-4 py-2 text-left">
                Title
              </th>
              <th className="font-semibold text-gray-600 text-[16px] px-4 py-2 text-left">
                Date
              </th>
              <th className="font-semibold text-gray-600 text-[16px] px-4 py-2 text-left">
                Platform
              </th>
              <th className="font-semibold text-gray-600 text-[16px] px-4 py-2 text-left">
                Fetched From
              </th>
              <th className="font-semibold text-gray-600 text-[16px] px-4 py-2 text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {listings.map((post, index) => (
              <tr
                key={index}
                className="border-b border-gray-300 hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-3 px-3">
                  <img
                    src={post.images[0]}
                    alt={post.from}
                    className="rounded-lg object-cover object-center w-[100px] h-[80px]"
                  />
                </td>
                <td
                  className="py-3 px-4 text-black font-normal text-left truncate max-w-[150px]"
                  title={post.title}
                >
                  {post.title}
                </td>
                <td className="py-3 px-4 text-black text-left font-normal whitespace-nowrap">
                  {formatDate(post.createdAt)}
                </td>
                <td
                  className="py-3 px-4 text-black font-normal text-left truncate max-w-[100px]"
                  title={post.platform}
                >
                  {post.platform === "facebook" ? (
                    <Image
                      src={facebook}
                      width={40}
                      height={40}
                      className="w-max h-max"
                      alt="facebook"
                    />
                  ) : (
                    <Image
                      src={wordpress}
                      width={40}
                      height={40}
                      alt="wordpress"
                    />
                  )}
                </td>
                <td
                  className="py-3 px-4 text-black font-normal text-left truncate max-w-[150px]"
                  title={post.from}
                >
                  {post.from}
                </td>
                <td className="py-3 px-4 text-center">
                  {"success" === "success" ? (
                    <button className="w-full h-[2rem] text-[14px] bg-green-200 text-green-700 rounded-full">
                      Success
                    </button>
                  ) : (
                    <button className="w-full h-[2rem] text-[14px] bg-red-200 text-red-700 rounded-full">
                      Failed
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
