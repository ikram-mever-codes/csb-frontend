import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="w-full min-h-[80vh] h-max px-[10px] flex flex-col gap-[20px] items-start">
      <div className="w-full text-left text-[20px] md:text-[24px] lg:text-[28px] font-[600]">
        Pricing & Plans
      </div>
      <div className="w-full flex flex-col md:flex-row justify-start items-start gap-[20px] md:gap-[50px]">
        <div className="w-full md:w-[40%] lg:w-[30%] button-gradient h-max md:h-[30vmax] rounded-xl shadow p-[20px] flex flex-col gap-[10px] justify-between items-center">
          <div className="uppercase text-white text-[22px] md:text-[26px] lg:text-[28px] tracking-wider w-full text-center">
            Advance
          </div>
          <div className="text-white text-[28px] md:text-[32px] lg:text-[35px] tracking-wide">
            $ {process.env.NEXT_PUBLIC_ADVANCE_PRICE}
            <span className="text-[14px] md:text-[16px]">/Monthly</span>
          </div>
          <div className="w-[70%] h-[1px] bg-gray-200"></div>
          <div className="w-full flex flex-col gap-[15px] items-center">
            <ul className="text-white space-y-[8px]">
              <li>✔️ &nbsp;Facebook Automation</li>
              <li>✔️ &nbsp;Wordpress Automation</li>
              <li>✔️ &nbsp;3 Api Tokens</li>
              <li>✔️ &nbsp;Unlimited Listings</li>
              <li>✔️ &nbsp;Analytics & Reports</li>
              <li>✔️ &nbsp;24/7 Customer Support</li>
            </ul>
          </div>
          <Link
            href={"/checkout?plan=advance"}
            className="w-full h-[2.5rem] flex justify-center items-center rounded-lg bg-black text-white uppercase"
          >
            Subscribe
          </Link>
        </div>

        <div className="w-full md:w-[40%] lg:w-[30%] bg-white h-max md:h-[30vmax] rounded-xl shadow p-[20px] flex flex-col gap-[10px] justify-between items-center">
          <div className="uppercase text-black text-[22px] md:text-[26px] lg:text-[28px] tracking-wider w-full text-center">
            Basic
          </div>
          <div className="text-black text-[28px] md:text-[32px] lg:text-[35px] tracking-wide">
            $ {process.env.NEXT_PUBLIC_BASIC_PRICE}
            <span className="text-[14px] md:text-[16px]">/Monthly</span>
          </div>
          <div className="w-[70%] h-[1px] bg-gray-200"></div>
          <div className="w-full flex flex-col gap-[15px] items-center">
            <ul className="text-black space-y-[8px]">
              <li>✔️ &nbsp;Facebook Automation</li>
              <li>❌ &nbsp;Wordpress Automation</li>
              <li>✔️ &nbsp;2 Api Tokens</li>
              <li>✔️ &nbsp;Unlimited Listings</li>
              <li>✔️ &nbsp;Analytics & Reports</li>
              <li>❌ &nbsp;24/7 Customer Support</li>
            </ul>
          </div>
          <Link
            href={"/checkout?plan=basic"}
            className="w-full h-[2.5rem] flex justify-center items-center rounded-lg bg-black text-white uppercase"
          >
            Subscribe
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
