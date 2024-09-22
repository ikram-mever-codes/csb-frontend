"use client";
import React, { useState, useEffect } from "react";
import { getAllListings } from "@/api";
import Image from "next/image";
import facebook from "../../assets/facebook.png";
import wordpress from "../../assets/wordpress.png";
import { useGlobalContext } from "../ContextProvider";
import { useRouter } from "next/navigation";

const Page = () => {
  const [listings, setListings] = useState([]);
  const { user } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    const fetchListings = async () => {
      if (user.role !== "user") {
        return router.push("/dashboard");
      }
      try {
        await getAllListings(setListings);
      } catch (error) {
        console.error("Error fetching listings:", error.message);
      }
    };

    fetchListings();
  }, [user, router]);

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="w-full min-h-[60vh] bg-white rounded-lg shadow-lg px-4 py-6 flex flex-col gap-6 md:px-8">
      <h2 className="text-2xl font-bold text-gray-800">Latest Posts</h2>

      {listings.length > 0 ? (
        <div className="w-full overflow-x-auto">
          <table className="min-w-full border-collapse hidden md:block">
            <thead className="border-b border-gray-300">
              <tr>
                {[
                  "Image",
                  "Title",
                  "Date",
                  "Platform",
                  "Fetched From",
                  "Status",
                ].map((heading, idx) => (
                  <th
                    key={idx}
                    className="font-semibold text-gray-600 text-left px-2 py-2 text-[14px] md:text-[16px]"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {listings.map((post, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-300 hover:bg-gray-50 transition duration-200"
                >
                  <td className="py-3 px-2 md:px-3">
                    <img
                      src={post?.images[0]}
                      alt={post?.from}
                      className="rounded-lg object-cover w-[80px] h-[60px] md:w-[100px] md:h-[80px]"
                    />
                  </td>
                  <td
                    className="py-3 px-2 md:px-4 text-left truncate max-w-[100px] md:max-w-[150px]"
                    title={post?.title}
                  >
                    {post?.title}
                  </td>
                  <td className="py-3 px-2 md:px-4 text-left">
                    {formatDate(post?.createdAt)}
                  </td>
                  <td className="py-3 px-2 md:px-4 text-left">
                    <Image
                      src={post?.platform === "facebook" ? facebook : wordpress}
                      width={30}
                      height={30}
                      alt={post?.platform}
                    />
                  </td>
                  <td
                    className="py-3 px-2 md:px-4 text-left truncate max-w-[100px] md:max-w-[150px]"
                    title={post?.from}
                  >
                    {post?.from}
                  </td>
                  <td className="py-3 px-2 md:px-4 text-center">
                    <span
                      className={`w-full inline-block py-1 px-3 rounded-full text-[12px] md:text-[14px] ${
                        post?.status === "success"
                          ? "bg-green-200 text-green-700"
                          : "bg-red-200 text-red-700"
                      }`}
                    >
                      {post?.status === "success" ? "Success" : "Failed"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className=" md:hidden flex flex-col gap-6">
            {listings.map((post, index) => (
              <div
                key={index}
                className="flex flex-col p-4 bg-white shadow-lg rounded-lg hover:bg-gray-50 transition duration-200"
              >
                <img
                  src={post?.images[0]}
                  alt={post?.from}
                  className="rounded-lg w-full h-auto mb-2"
                />
                <div className="text-black font-bold">{post?.title}</div>
                <div className="text-gray-600">
                  {formatDate(post?.createdAt)}
                </div>
                <div className="flex items-center mt-2">
                  <Image
                    src={post?.platform === "facebook" ? facebook : wordpress}
                    width={20}
                    height={20}
                    alt={post?.platform}
                  />
                  <span className="ml-2">{post?.from}</span>
                </div>
                <div className="mt-2 text-center">
                  <span
                    className={`py-1 px-3 rounded-full ${
                      post?.status === "success"
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-700"
                    }`}
                  >
                    {post?.status === "success" ? "Success" : "Failed"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">No listings found.</div>
      )}
    </div>
  );
};

export default Page;
