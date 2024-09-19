import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="w-full min-h-[80vh]  h-max md:px-[10px] flex justify-start items-start flex-col gap-[20px]">
      <div className="w-full text-left text-[20px] font-[600]">
        Pricing & Plans
      </div>
      <div className="w-full flex justify-start items-start gap-[50px]">
        <div className="w-[22vw] button-gradient h-[30vmax] rounded-xl shadow p-[20px] flex justify-between items-center flex-col gap-[10px] ">
          <div className="uppercase text-white text-[22px] tracking-wider w-full text-center">
            Advance
          </div>
          <div className="text-white text-[35px] tracking-wide">
            $ 99.99 <span className="text-[16px]">/Monthly</span>
          </div>
          <div className="w-[70%] h-[1px] bg-gray-200"></div>
          <div className="w-full h-max flex justify-start items-center gap-[15px] flex-col">
            <ul className="w-full text-white">
              <li>✔️ &nbsp;Facebook Automation</li>
              <li>✔️ &nbsp;Wordpress Automation</li>
              <li> ✔️ &nbsp;3 Api Tokens</li>
              <li>✔️ &nbsp;Unlimited Listings</li>
              <li>✔️ &nbsp;Analytics & Reports</li>
              <li>✔️ &nbsp;24/7 Customer Support</li>
            </ul>
            {/* <div className="w-full text-center uppercase text-white text-[12px]">
              Membership Valid Till <br /> 31-12-24
            </div> */}
          </div>
          <Link
            href={"/checkout?plan=advance"}
            className="w-full h-[2.5rem] flex justify-center items-center rounded-lg bg-black text-white uppercase"
          >
            Subscribe
          </Link>
        </div>
        <div className="w-[22vw] bg-white h-[30vmax] rounded-xl shadow p-[20px] flex justify-between items-center flex-col gap-[10px] ">
          <div className="uppercase text-black text-[22px] tracking-wider w-full text-center">
            Basic
          </div>
          <div className="text-black text-[35px] tracking-wide">
            $ 39.99 <span className="text-[16px]">/Monthly</span>
          </div>
          <div className="w-[70%] h-[1px] bg-gray-200"></div>
          <div className="w-full h-max text-black flex justify-start items-center gap-[15px] flex-col">
            <ul className="w-full">
              <li>✔️ &nbsp;Facebook Automation</li>
              <li>❌ &nbsp;Wordpress Automation</li>
              <li> ✔️ &nbsp;2 Api Tokens</li>
              <li>✔️ &nbsp;Unlimited Listings</li>
              <li> ✔️ &nbsp;Analytics & Reports</li>
              <li> ❌ &nbsp;24/7 Customer Support</li>
            </ul>
            {/* <div className="w-full text-center uppercase  text-[12px]">
              Membership Valid Till <br /> 31-12-24
            </div> */}
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
