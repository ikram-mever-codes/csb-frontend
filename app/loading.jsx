"use client";

import React from "react";
import { ColorRing } from "react-loader-spinner";

const Loading = React.memo(
  ({ size = 120, height = "full", message = "Loading..." }) => {
    return (
      <div
        className={`flex justify-center items-center w-full ${
          height ? `h-${height}` : "min-h-[100vh]"
        }`}
      >
        <div
          className={`flex flex-col items-center justify-center h-[100vh] w-full`}
        >
          <ColorRing
            visible={true}
            height={size}
            width={size}
            ariaLabel={`${message}-loading`}
            wrapperClass="color-ring-wrapper"
            colors={["#e36c40", "#d95b39", "#c3392b", "#c3392b", "#e36c40"]}
          />
          <span className="mt-4 text-sm text-gray-500">{message}</span>
        </div>
      </div>
    );
  }
);

// Add display name for better debugging
Loading.displayName = "Loading";

export default Loading;
