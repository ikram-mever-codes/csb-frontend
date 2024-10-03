"use client";
import React from "react";
import Link from "next/link";
import { MdCheckCircle } from "react-icons/md";
import { FaCog } from "react-icons/fa";

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-background p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold text-[#B82724] mb-4 flex items-center justify-center">
          <MdCheckCircle className="text-green-500 text-4xl mr-2" />
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Thank you for your payment! Your transaction was successful.
        </p>
        <div className="flex flex-col space-y-4">
          <Link
            href="/dashboard"
            className="w-full h-[2.5rem] button-gradient text-white font-bold rounded-lg flex justify-center items-center"
          >
            <MdCheckCircle className="mr-2" />
            Go to Dashboard
          </Link>
          <Link
            href="/settings?tab=token"
            className="w-full h-[2.5rem] bg-gray-200 text-[#B82724] font-bold rounded-lg flex justify-center items-center transition-transform transform hover:scale-105"
          >
            <FaCog className="mr-2" />
            Manage API Tokens
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
