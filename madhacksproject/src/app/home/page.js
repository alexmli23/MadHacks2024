"use client"; // Add this line at the top

import React, { useState } from "react";

const CategoriesList = () => {
  // Separate categories into two lists
  const prioritizedCategories = [
    "Politics",
    "Food",
    "Sports",
    "Entertainment",
    "Art",
    "Gaming",
  ];

  const otherCategories = [
    "Education",
    "Technology",
    "Beauty",
    "Literature",
    "Labor",
    "Movies",
  ];

  // State to track which categories are clicked
  const [clickedCategories, setClickedCategories] = useState([]);

  // Toggle the clicked state of a category
  const handleCategoryClick = (category) => {
    setClickedCategories((prevClickedCategories) =>
      prevClickedCategories.includes(category)
        ? prevClickedCategories.filter((item) => item !== category)
        : [...prevClickedCategories, category]
    );
  };

  return (
    <div className="relative flex flex-col justify-between items-center min-h-screen">
      {/* Background Video */}
      <video
        src="/Assets/background.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      ></video>

      {/* Prioritized Interests */}
      <div className="flex flex-col items-center space-y-4 z-10 pt-10 px-10">
        <h2 className="text-3xl font-bold text-sky-500 mb-4">
          Prioritized Interests
        </h2>
        <div className="flex flex-wrap justify-center items-center space-x-4">
          {prioritizedCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category)}
              className={`px-8 py-4 rounded-lg shadow-lg text-2xl font-semibold mb-4 ${
                clickedCategories.includes(category)
                  ? "bg-blue-500 text-white"
                  : "bg-orange-500 text-orange"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Other Categories */}
      <div className="flex flex-col items-center space-y-4 z-10 pb-40 px-10">
        <h2 className="text-3xl font-bold text-sky-500 mb-4">
          Other Categories
        </h2>
        <div className="flex flex-wrap justify-center items-center space-x-4">
          {otherCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category)}
              className={`px-8 py-4 rounded-lg shadow-lg text-2xl font-semibold mb-4 ${
                clickedCategories.includes(category)
                  ? "bg-blue-500 text-white"
                  : "bg-orange-500 text-orange"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesList;
