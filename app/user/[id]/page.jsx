"use client";
import {
  changeMembershipType,
  deleteUserAccount,
  getSingleUserDetails,
} from "@/adminApi";
import Loading from "@/app/loading";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import placeholder from "../../../assets/placeholder.webp";
import {
  FaUserEdit,
  FaTrashAlt,
  FaEye,
  FaDollarSign,
  FaTimesCircle,
} from "react-icons/fa";
import Image from "next/image";

const UserDetailsPage = () => {
  const [user, setUser] = useState(null);
  const [showMembershipSelect, setShowMembershipSelect] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Basic"); // Default plan
  const router = useRouter();
  const { id } = useParams();
  const [totalSpent, setTotalSpent] = useState("");

  const fetchUserDetails = async () => {
    let fetchedUser = await getSingleUserDetails(id);
    if (!fetchedUser) {
      router.push("/admin/users");
    } else {
      setUser(fetchedUser);
      const totalSales = fetchedUser.transactions
        ? fetchedUser?.transactions?.reduce((sum, invoice) => {
            return sum + invoice.total_amount;
          }, 0)
        : "$0";
      setTotalSpent(totalSales);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleUserDelete = async () => {
    let consent = confirm("Do you want to delete this User Account?");
    if (!consent) {
      return;
    }
    await deleteUserAccount(id, router);
  };

  const handleChangeMembership = async () => {
    await changeMembershipType(user.user._id, selectedPlan);

    setShowMembershipSelect(false);
  };

  function formatDate(dat) {
    let date = new Date(dat);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}-${month}-${year}` !== "NaN-NaN-NaN"
      ? `${day}-${month}-${year}`
      : "N/A";
  }

  if (!user) return <Loading />;

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-xl rounded-lg p-8 mb-6">
        <div className="flex items-center space-x-6">
          <Image
            width={80}
            height={80}
            src={user.user.avatar ? user.user.avatar : placeholder}
            alt={`${user.user.firstName || "User"} ${user.user.lastName || ""}`}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {user.user.firstName && user.user.lastName
                ? `${user.user.firstName} ${user.user.lastName}`
                : "No Name Available"}
            </h1>
            <p className="text-gray-500">
              {user.user.email || "No Email Provided"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-lg p-8 mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <FaDollarSign className="mr-2" /> Membership Info
        </h2>
        <div className="space-y-2 text-lg">
          <p>
            <span className="font-medium text-gray-600">Plan: </span>
            {user.subscription?.plan || "N/A"}
          </p>
          <p>
            <span className="font-medium text-gray-600">Ending Date: </span>
            {formatDate(user.subscription?.endDate) || "N/A"}
          </p>
          <p>
            <span className="font-medium text-gray-600">Price Spent: </span>
            {`$${Number(totalSpent).toFixed(1)}` || "$0"}
          </p>
        </div>
        <button
          onClick={() => setShowMembershipSelect(!showMembershipSelect)}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
        >
          <FaUserEdit className="mr-2" />
          Change Membership Type
        </button>

        {showMembershipSelect && (
          <div className="mt-4">
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="basic">Basic Plan</option>
              <option value="advance">Advanced Plan</option>
            </select>
            <button
              onClick={handleChangeMembership}
              className="ml-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Confirm Change
            </button>
          </div>
        )}
      </div>

      {/* Other components remain unchanged */}
      <div className="bg-white shadow-xl rounded-lg p-8 mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <FaEye className="mr-2" /> API Tokens
        </h2>
        {user.apiTokens && user.apiTokens.length > 0 ? (
          <ul className="space-y-3">
            {user.apiTokens.map((token) => (
              <li
                key={token._id}
                className="flex justify-between p-4 bg-gray-50 rounded-md border border-gray-200"
              >
                <div>
                  <span className="text-lg font-medium">{token.apiToken}</span>
                  <span className="ml-4 text-gray-500 text-sm">
                    Created on {token.createdAt}
                  </span>
                </div>
                <button className="text-red-500 hover:text-red-600 transition flex items-center">
                  <FaTrashAlt className="mr-1" />
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No API Tokens Found</p>
        )}
      </div>

      <div className="bg-white shadow-xl rounded-lg p-8 mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <FaDollarSign className="mr-2" /> Transactions
        </h2>
        {user.transactions && user.transactions.length > 0 ? (
          <ul className="space-y-4">
            {user.transactions.map((transaction) => (
              <li
                key={transaction._id}
                className="flex justify-between p-4 bg-gray-50 rounded-md border border-gray-200"
              >
                <div>
                  <p className="text-lg font-medium text-gray-800">
                    Plan: {transaction.plan}
                  </p>
                  <p className="text-sm text-gray-500">
                    Issue Date:{" "}
                    {new Date(transaction.invoice_date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Amount: ${transaction.total_amount}
                  </p>
                </div>
                <a
                  href={transaction.pdf_url}
                  target="_blank"
                  className="text-blue-500 hover:text-blue-600 transition"
                  rel="noopener noreferrer"
                >
                  View Invoice
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No Transactions Found</p>
        )}
      </div>

      <div className="bg-white shadow-xl rounded-lg p-8 mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <FaTimesCircle className="mr-2" /> Account Actions
        </h2>
        <div className="space-y-4">
          <button
            className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition flex items-center justify-center"
            onClick={() => {
              handleUserDelete();
            }}
          >
            <FaTrashAlt className="mr-2" />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
