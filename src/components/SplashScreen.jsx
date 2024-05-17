import React from "react";

const SplashScreen = () => {
  return (
    <div className="absolute flex flex-col h-full w-full justify-center content-center bg-white">
      <label className="flex flex-col">
        <span className="loading loading-spinner h-[40px] w-[40px] bg-primary mx-auto mb-3"></span>
        <span className="text-black mx-auto animate-pulse">
          Loading, please wait
        </span>
      </label>
    </div>
  );
};

export default SplashScreen;
