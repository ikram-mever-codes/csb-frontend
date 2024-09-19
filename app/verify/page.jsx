"use client";
import { resendCode, verifyAccount } from "@/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { toast } from "react-toastify";

const Page = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const handleChange = (e, index) => {
    const value = e.target.value;
    const newCode = [...code];

    // Handle input value change
    if (/^\d$/.test(value) || value === "") {
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }

    // Handle backspace key event
    if (e.key === "Backspace" && !value && index > 0) {
      document.getElementById(`code-${index - 1}`).focus();
      newCode[index - 1] = "";
      setCode(newCode);
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").trim();
    if (pasteData.length === 6 && /^\d{6}$/.test(pasteData)) {
      const newCode = pasteData.split("").slice(0, 6);
      setCode(newCode);

      document.getElementById(`code-${newCode.length - 1}`).focus();
    }
    e.preventDefault();
  };

  const handleSubmit = async () => {
    if (code.join("").length < 6) {
      return toast.error("Incomplete Code!");
    }
    setLoading(true);
    await verifyAccount(email, code.join(""), router);
    setLoading(false);
  };
  const handleResend = async () => {
    await resendCode(email);
  };
  useEffect(() => {
    const signUpData = JSON.parse(localStorage.getItem("signUpData"));

    if (!signUpData || Date.now() > signUpData.expiry) {
      localStorage.removeItem("signUpData");
      router.push("/sign-up");
    }
    setEmail(signUpData.email);
  }, [router]);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#a42bac] via-black to-[#f13026]"
      onPaste={handlePaste}
    >
      <div className="w-full max-w-md bg-white p-8 rounded-lg relative shadow-lg">
        <Link
          href={"sign-up"}
          className="absolute top-0 left-0 m-[10px] text-[30px] rounded-md  font-bold"
        >
          <MdKeyboardArrowLeft />
        </Link>
        <h2 className="text-3xl font-bold text-center flex justify-center items-center gap-[0px] w-full text-gray-800 mb-6">
          Verify Your Account
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Enter the 6-digit verification code sent to your{" "}
          <span className="font-semibold">{email}</span>.
        </p>
        <div className="flex justify-center mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleChange(e, index)}
              className="w-12 h-12 mx-2 text-center text-2xl border border-gray-300 rounded-lg focus:outline-none focus:border-[#E36C40]"
            />
          ))}
        </div>
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="w-full py-3 bg-[#E36C40] text-white font-semibold rounded-lg hover:bg-[#b6271e] transition duration-300 disabled:cursor-not-allowed disabled:bg-[#89160d]"
        >
          Verify Account
        </button>
        <p className="mt-4 text-center text-gray-600">
          Didn&apos;t receive the code?
          <button
            className="text-[#E36C40] hover:underline"
            onClick={handleResend}
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default Page;
