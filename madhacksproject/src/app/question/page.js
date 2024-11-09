"use client"
import React, { useEffect, useState } from 'react';

const question = () => {
  const [buttonColor, setButtonColor] = useState('bg-blue-500');

  useEffect(() => {
    const colors = ['bg-blue-500', 'bg-orange-500'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setButtonColor(randomColor);
  }, []);

  return (
    <div className="relative w-full h-screen">
      <video
        src="/Assets/background.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      ></video>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4 bg-gray-100 p-6 rounded-md shadow-lg w-4/5 md:w-1/2 lg:w-1/3">
          <div className="bg-gray-200 text-gray-800 border border-gray-800 p-4 rounded-md w-full text-center">
            Was the 2024 Election Rigged?
          </div>
          <form className="flex flex-col items-center w-full">
            <textarea
              placeholder="Your answer"
              className="w-full h-32 p-2 border border-gray-400 rounded-md resize-none focus:outline-none focus:border-blue-500"
            ></textarea>
            <button
              type="submit"
              className={`${buttonColor} mt-4 px-4 py-2 text-white rounded-md hover:opacity-90 focus:outline-none`}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default question;
