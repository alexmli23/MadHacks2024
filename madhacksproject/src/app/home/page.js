import React from "react";

const CategoriesList = () => {
  const categories = [
    "Politics",
    "Food",
    "Sports",
    "Entertainment",
    "Art",
    "Gaming",
    "Education",
    "Technology",
    "Beauty",
    "Literature",
    "Labor",
    "Movies",
  ];

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
          {categories.map((category, index) => (
            <div
              key={index}
              className="px-8 py-4 bg-orange-500 text-white text-center rounded-lg shadow-lg text-2xl font-semibold mb-4"
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      {/* Other Categories */}
      <div className="flex flex-col items-center space-y-4 z-10 pb-40 px-10">
        <h2 className="text-3xl font-bold text-sky-500 mb-4">
          Other Categories
        </h2>
        <div className="flex flex-wrap justify-center items-center space-x-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="px-8 py-4 bg-orange-500 text-white text-center rounded-lg shadow-lg text-2xl font-semibold mb-4"
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesList;
