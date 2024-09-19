"use client";
import React from "react";
import { ColorRing } from "react-loader-spinner";

const Loading = ({ size, height }) => {
  return (
    <div
      className={`flex justify-center items-center w-full ${
        !height && "min-h-[100vh]"
      } h-${height || "full"}`}
    >
      <div className="flex flex-col items-center">
        <ColorRing
          visible={true}
          height={size || 120}
          width={size || 120}
          ariaLabel="color-ring-loading"
          wrapperClass="color-ring-wrapper"
          colors={["#e36c40", "#d95b39", "#c3392b", "#c3392b", "#e36c40"]}
        />
      </div>
    </div>
  );
};

export default Loading;
