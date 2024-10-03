"use client";
import { useGlobalContext } from "@/app/ContextProvider";
import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
  const router = useRouter();
  const { user } = useGlobalContext();
  useEffect(() => {
    if (user) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Sign In</h1>
        <SignIn
          path="/sign-in"
          signUpUrl="/sign-up"
          routing="path"
          redirectUrl="/dashboard"
        />
      </div>
    </div>
  );
}
