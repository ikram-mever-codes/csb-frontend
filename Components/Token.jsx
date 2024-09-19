"use client";
import React, { useState, useEffect } from "react";
import { MdAdd, MdDelete, MdContentCopy } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { createToken, deleteToken, getAllTokens } from "@/api";
import { toast } from "react-toastify";
import Loading from "@/app/loading";
import facebook from "../assets/facebook.png";
import wordpress from "../assets/wordpress.png";
import Image from "next/image";

const CreateToken = ({ setTokens }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("");
  const [wordpressUrl, setWordpressUrl] = useState("");

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createToken(type, wordpressUrl, setTokens);
    handleClose();
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="w-max h-[2.5rem] flex justify-center items-center gap-[1px] button-gradient rounded-md px-4 py-2 text-white"
      >
        <MdAdd className="text-[22px]" aria-label="Create API Token" /> Create
        API Token
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[10000] bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Create API Token
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Type
                </label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                >
                  <option value="" disabled>
                    Select type
                  </option>
                  <option value="facebook">Facebook</option>
                  <option value="wordpress">WordPress</option>
                </select>
              </div>

              {type === "wordpress" && (
                <div>
                  <label
                    htmlFor="wordpressUrl"
                    className="block text-sm font-medium text-gray-700"
                  >
                    WordPress URL
                  </label>
                  <input
                    id="wordpressUrl"
                    type="url"
                    value={wordpressUrl}
                    onChange={(e) => setWordpressUrl(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    placeholder="Enter WordPress URL"
                    required={type === "wordpress"}
                  />
                </div>
              )}

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="button-gradient text-white px-4 py-2 rounded-md transition duration-200"
                >
                  <MdAdd className="inline text-lg" aria-label="Create Token" />{" "}
                  Create Token
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
                >
                  <FaRegEdit className="inline text-lg" aria-label="Cancel" />{" "}
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const Token = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getAllTokens(setTokens);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };
  const handleDelete = async (tokenId) => {
    try {
      await deleteToken(tokenId, setTokens);
    } catch (error) {
      return toast.error(error.message);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="w-full h-max min-h-[60vh] flex justify-start items-start flex-col gap-[20px]">
      <CreateToken setTokens={setTokens} />
      <div className="w-[80%] h-max overflow-x-auto shadow-xl rounded-md mx-auto">
        <table className="min-w-full border-collapse bg-white  rounded-md overflow-hidden">
          <thead>
            <tr className="button-gradient text-white">
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold uppercase">
                API KEY
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold uppercase">
                TYPE
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold uppercase">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {tokens?.length !== 0 ? (
              tokens.map((token) => (
                <tr
                  key={token._id}
                  className="bg-gray-50 hover:bg-gray-100 transition duration-200"
                >
                  <td className="px-6 py-4 border-b border-gray-300 text-sm truncate max-w-[400px]">
                    {token.apiToken}
                    <button
                      onClick={() => handleCopy(token.apiToken)}
                      className="ml-2 bg-gray-200 hover:bg-gray-300 p-1 rounded-full transition duration-200"
                      aria-label="Copy API Key"
                    >
                      <MdContentCopy className="text-lg" />
                    </button>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-md">
                    {token.type === "facebook" ? (
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
                  <td className="px-6 py-4 border-b border-gray-300 text-sm">
                    <button
                      className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition duration-200"
                      aria-label="Delete Token"
                      onClick={() => {
                        handleDelete(token._id);
                      }}
                    >
                      <MdDelete className="text-lg" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 text-center" colSpan="4">
                  No Tokens Found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Token;
