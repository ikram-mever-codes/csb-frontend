"use client";

import React, { useMemo, Suspense } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import AuthProvider from "./AuthProvider";
import { useGlobalContext } from "./ContextProvider";
import Loading from "./loading";

const AdminDashboard = dynamic(() => import("@/Components/AdminDashboard"), {
  suspense: true,
});
const Dashboard = dynamic(() => import("@/Components/Dashboard"), {
  suspense: true,
});
const Header = dynamic(() => import("@/Components/Header"), { suspense: true });

const LayoutProvider = React.memo(({ children }) => {
  const pathname = usePathname();
  const { loading, user } = useGlobalContext();

  const excludeDashboard = useMemo(
    () =>
      [
        "/payment-success",
        "/login",
        "/sign-in",
        "/sign-up",
        "/",
        "/verify",
        "/support",
      ].includes(pathname),
    [pathname]
  );

  if (loading) return <Loading />;

  if (excludeDashboard) return <main>{children}</main>;

  return (
    <AuthProvider>
      <div className="flex w-full min-h-screen">
        <div className="sticky top-0 h-screen w-[17%] md:w-1/5">
          <Suspense fallback={<Loading size={60} />}>
            {user?.role === "admin" ? <AdminDashboard /> : <Dashboard />}
          </Suspense>
        </div>
        <div className="w-[83%] md:w-[80%] py-[15px] flex flex-col gap-[20px] h-screen overflow-y-scroll overflow-x-hidden">
          <Suspense fallback={<Loading size={60} />}>
            <Header />
          </Suspense>
          <main className="flex-grow p-[20px] md:px-[30px] md:py-[20px]">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
});

// Add display name for better debugging
LayoutProvider.displayName = "LayoutProvider";

export default LayoutProvider;
