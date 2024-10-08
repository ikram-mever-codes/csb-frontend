"use client";

import AdminDashboard from "@/Components/AdminDashboard";
import Dashboard from "@/Components/Dashboard";
import Header from "@/Components/Header";
import { usePathname } from "next/navigation";
import React from "react";
import AuthProvider from "./AuthProvider";
import { useGlobalContext } from "./ContextProvider";
import Loading from "./loading";

const LayoutProvider = ({ children }) => {
  const pathname = usePathname();
  const { loading, user } = useGlobalContext();
  const excludeDashboard = [
    "/payment-success",
    "/login",
    "/sign-in",
    "/sign-up",
    "/",
    "/verify",
    "/support",
  ].includes(pathname);

  if (loading) return <Loading />;

  if (excludeDashboard) return <main>{children}</main>;

  return (
    <AuthProvider>
      <div className="flex w-full min-h-screen">
        <div className="sticky top-0 h-screen w-[17%] md:w-1/5">
          {user?.role === "admin" ? <AdminDashboard /> : <Dashboard />}
        </div>
        <div className="w-[83%] md:w-[80%] py-[15px] flex flex-col gap-[20px] h-screen overflow-y-scroll overflow-x-hidden">
          <Header />
          <main className="flex-grow p-[20px] md:px-[30px] md:py-[20px]">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
};

export default LayoutProvider;
