"use client"; // Add this line at the top

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CategoriesList = () => {
  const [userInterests, setUserInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  // List of all available categories
  const allCategories = [
    "Politics",
    "Food",
    "Sports",
    "PopCulture",
    "Art",
    "Gaming",
    "ScienceEducation",
    "Tech",
    "FinanceEconomics",
    "Beauty",
    "Books",
    "Business",
    "TVMovies",
    "Fashion",
  ];

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      console.log("Retrieved userId from localStorage:", storedUserId);
    } else {
      console.error("User ID is missing in localStorage");
      setError("User ID is missing. Please log in again.");
    }
  }, []);

  // Fetch user's interests when the component mounts
  useEffect(() => {
    const fetchUserInterests = async () => {
      try {
        const response = await fetch(`http://localhost:5001/get-interests/${userId}`);
        const data = await response.json();
        if (response.ok) {
          setUserInterests(data.interests);
        } else {
          console.error("Failed to fetch interests:", data.message);
        }
      } catch (error) {
        console.error("Error fetching interests:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserInterests();
    }
  }, [userId]);

  // Separate categories into prioritized (user's interests) and others
  const prioritizedCategories = allCategories.filter((category) =>
    userInterests.includes(category)
  );

  const otherCategories = allCategories.filter(
    (category) => !userInterests.includes(category)
  );

  // State to track the selected category (only one at a time)
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Handle category click (only allow one category to be selected)
  const handleCategoryClick = (category) => {
    setSelectedCategory((prevSelectedCategory) =>
      prevSelectedCategory === category ? null : category
    );
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!selectedCategory) {
      console.error("No category selected");
      return;
    }
  
    // Send the selected category to the server to update the user's 'today' field
    try {
      const response = await fetch('http://localhost:5001/update-today', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, interest: selectedCategory }),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log("Today interest updated:", data.message);
      } else {
        console.error("Failed to update today's interest:", data.message);
      }
    } catch (error) {
      console.error("Error updating today's interest:", error);
    }
  
    // Process the selected category (e.g., navigate to the next page)
    console.log("Selected category:", selectedCategory);
    router.push("/question");
  };  

  // Render loading state
  if (loading) {
    return <div>Loading interests...</div>;
  }

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
        <h2 className="text-3xl font-bold text-sky-500 mb-4">Your Interests</h2>
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