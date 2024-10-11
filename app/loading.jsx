"use client";

import React from "react";
import { ColorRing } from "react-loader-spinner";

const Loading = React.memo(
  ({ size = 120, height = "full", message = "Loading..." }) => {
    const containerHeight = height === "full" ? "h-screen" : "min-h-[100vh]";

    return (
      <div
        className={`flex justify-center items-center w-full ${containerHeight}`}
      >
        <div className="flex flex-col items-center justify-center h-full w-full">
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

Loading.displayName = "Loading";

export default Loading;
