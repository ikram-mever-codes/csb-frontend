import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/dashboard"
        className="px-6 py-3 bg-gradient-to-r from-[#E36C40] to-[#B82724] text-white rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
