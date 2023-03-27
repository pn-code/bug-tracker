import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoadingScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-2 mt-36">
            <h1 className="text-3xl font-semibold">Bug Tracker</h1>
            <span className="text-[16px] text-gray-600">Please wait while we fetch your details...</span>
            <AiOutlineLoading3Quarters size={50} className="animate-spin text-green-600/60"/>
        </div>
    );
};

export default LoadingScreen;
