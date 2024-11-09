"use client";

import React, { useState } from "react";
import WheelOfFortune from "../Components/SpinWheel";
import Link from "next/link";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <>
      <video
        src="/Assets/background.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      ></video>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="relative bg-[#f9f9f9] p-8 rounded-lg shadow-lg overflow-hidden flex flex-col items-center w-[95vw] max-w-lg h-auto">
            <Link href="/home">
              <button className="absolute top-4 right-4 text-black bg-red-300 hover:bg-red-600 rounded-full h-8 w-8 flex items-center justify-center font-bold">
                X
              </button>
            </Link>
            <WheelOfFortune />
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
