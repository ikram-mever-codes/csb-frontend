"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import car from "../../assets/car2.png";
import google from "../../assets/google.png";
import facebook from "../../assets/facebook.png";
import { login } from "@/api";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../ContextProvider";
const Page = () => {
  const { user, setUser } = useGlobalContext();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password, router, setUser);

    setLoading(false);
  };
  useEffect(() => {
    if (user !== null) {
      return router.push("/dashboard");
    }
  }, [user]);
  return (
    <div className="w-[100vw] h-max min-h-[100vh] flex justify-between items-center relative bg-white">
      <div
        className="w-[40%] h-[100vh] max-h-[100vh] gradient-background flex justify-between items-center flex-col relative"
        style={{
          borderRadius: "30px",
          borderTopLeftRadius: "0px",
          borderBottomLeftRadius: "0px",
        }}
      >
        <div className="w-full flex justify-center items-center py-[20px] ">
          <Image
            src="/logo-main.png"
            className="w-[100px] h-max object-cover object-center "
            width={80}
            height={80}
            alt="CSB LOGO"
            priority
          />
          <h1
            className="font-bold text-white text-[25px]"
            style={{ lineHeight: "40px", letterSpacing: "4px" }}
          >
            CARSALESBOOST
          </h1>
        </div>
        <div>
          <h2
            className="font-[700] text-[25px] text-white text-left"
            style={{ lineHeight: "38px" }}
          >
            Effortlessly{" "}
            <span
              style={{ borderBottom: "1px solid white", paddingBottom: "3px" }}
            >
              Boost🚀
            </span>
            <br />
            Your Car Listings
          </h2>
          <div
            className="text-[#f2efef] font-[400] text-left my-[10px]"
            style={{ lineHeight: "24px" }}
          >
            Welcome back to Carsalesboost! Seamlessly
            <br /> manage and automate your car listings. Sign in to
            <br /> continue!
          </div>
        </div>
        <div>
          <Image
            src={car}
            alt="Car Listings"
            width={900}
            height={300}
            priority
            className="w-[100%] h-[300px] object-cover object-center relative left-[0px]"
          />
        </div>
      </div>
      <div className="w-[60%] h-full flex justify-center items-center ">
        <div className="flex justify-between items-center flex-col h-[70vh] gap-[30px] ">
          <div className="font-[700] text-[30px]">
            Sign in To CarSalesBoost!
          </div>
          <form
            className="flex justify-center items-center w-[20rem] h-full flex-col gap-[20px]"
            onSubmit={handleSubmit}
          >
            <div className="flex justify-start items-center bg-[#e3e1e1] gap-[5px] w-[20rem] h-[3rem] rounded-full p-[10px] px-[15px]">
              <MdEmail className="text-[25px]" />
              <input
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="Email"
                className="w-full h-[3rem] bg-transparent border-none outline-none text-[18px]"
              />
            </div>
            <div className="flex justify-start items-center bg-[#e3e1e1] gap-[5px] w-[20rem] h-[3rem] rounded-full p-[10px] px-[15px]">
              <MdLock className="text-[25px]" />
              <input
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="w-full h-[3rem] bg-transparent border-none outline-none text-[18px]"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? (
                  <MdVisibilityOff className="text-[20px]" />
                ) : (
                  <MdVisibility className="text-[20px]" />
                )}
              </button>
            </div>
            <div className="w-[20rem] text-right">
              <Link
                href={"#"}
                style={{ borderBottom: "1px solid #818181 " }}
                className=" text-[14px]  text-[#818181]"
              >
                Forgot Password
              </Link>
            </div>
            <button
              disabled={loading}
              type="submit"
              className="button-gradient w-full h-[3rem] rounded-md text-white font-[600] text-[20px]"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>
          <div className="flex justify-start items-center flex-col gap-[10px]">
            <div className="flex justify-center items-center w-[15rem]">
              <div className="bg-[#818181] h-[1px] w-[30%]"></div>
              <div className="w-[40%] text-center font-[500] text-[14px]">
                Or Login with
              </div>
              <div className="bg-[#818181] h-[1px] w-[30%]"></div>
            </div>
            <div className="flex justify-center items-center gap-[20px]">
              <button
                style={{
                  border: "1px solid black",
                  width: "40px",
                  height: "40px",
                  overflow: "hidden",
                  borderRadius: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={google}
                  width={35}
                  height={35}
                  className="object-cover object-center"
                  alt="Google"
                />
              </button>
              <button
                style={{
                  border: "1px solid black",
                  width: "40px",
                  height: "40px",
                  overflow: "hidden",
                  borderRadius: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={facebook}
                  width={100}
                  height={100}
                  className="object-cover object-center w-full h-full"
                  alt="Google"
                />
              </button>
            </div>
          </div>
          <div className="w-full flex justify-center items-center gap-[5px]">
            <div className="font-[500]">
              Don&apos;t have an Account?{" "}
              <Link className="text-[#E36C40] font-500" href={"/sign-up"}>
                Sign Up now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
