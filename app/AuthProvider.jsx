"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "./ContextProvider";

const AuthProvider = ({ children }) => {
  const { loading = false, user = null } = useGlobalContext() || {};
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  return user ? children : null;
};

export default AuthProvider;
