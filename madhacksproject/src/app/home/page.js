"use client"; // Add this line at the top

import React, { useState } from "react";
import { useRouter } from 'next/navigation';

const CategoriesList = () => {
  const router = useRouter();

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

  // State to track the selected category (only one at a time)
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Handle category click (only allow one category to be selected)
  const handleCategoryClick = (category) => {
    setSelectedCategory((prevSelectedCategory) =>
      prevSelectedCategory === category ? null : category
    );
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedCategory) {
      console.error("No category selected");
      return;
    }

    // Process the selected category (e.g., send it to a server or update the state)
    console.log("Selected category:", selectedCategory);
    // For example, if you want to send it to an API, you can do that here
    router.push('/question');
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
                selectedCategory === category
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
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-orange-500 text-orange"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="z-10">
        <button
          onClick={handleSubmit}
          className="px-8 py-4 rounded-lg shadow-lg text-2xl font-semibold bg-green-500 text-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CategoriesList;