"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "./ContextProvider";

const AuthProvider = ({ children }) => {
  const { user, loading } = useGlobalContext();
  const router = useRouter();
  console.log(user);
  useEffect(() => {
    if (user === null && !loading) {
      router.push("/login");
    }
  }, [user, router]);

  if (user === null) {
    return null;
  }

  return children;
};

export default AuthProvider;
