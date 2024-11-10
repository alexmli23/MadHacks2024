"use client";

import React, { useState } from "react";
import Link from "next/link";

const Intro = () => {
  const texts = ["Was the 2024 Presidential Election Rigged?"];
  const categories = ["POLITICS"];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  const options = [
    {
      text: "Comment 1: Interesting perspective!",
      bluePercent: 80,
      neutralPercent: 10,
      redPercent: 10,
    },
    {
      text: "Comment 2: I disagree with this.",
      bluePercent: 20,
      neutralPercent: 60,
      redPercent: 20,
    },
    {
      text: "Comment 3: Could be possible!",
      bluePercent: 20,
      neutralPercent: 10,
      redPercent: 70,
    },
    {
      text: "Comment 4: Needs more evidence.",
      bluePercent: 10,
      neutralPercent: 10,
      redPercent: 80,
    },
  ];

  const initialVotes = options.map(() => ({
    upvotes: 0,
    downvotes: 0,
    userVoted: null,
  }));
  const [votes, setVotes] = useState(initialVotes);

  const handleUpvote = (index) => {
    setVotes((prevVotes) =>
      prevVotes.map((vote, i) =>
        i === index
          ? { ...vote, upvotes: vote.upvotes + 1, userVoted: "up" }
          : vote
      )
    );
  };

  const handleDownvote = (index) => {
    setVotes((prevVotes) =>
      prevVotes.map((vote, i) =>
        i === index
          ? { ...vote, downvotes: vote.downvotes + 1, userVoted: "down" }
          : vote
      )
    );
  };

  const filteredOptions = options.filter((option) => {
    const maxPercent = Math.max(
      option.redPercent,
      option.bluePercent,
      option.neutralPercent
    );
    if (filter === "Highest Red") return option.redPercent === maxPercent;
    if (filter === "Highest Blue") return option.bluePercent === maxPercent;
    if (filter === "Highest Neutral")
      return option.neutralPercent === maxPercent;
    return true; // "All" option, show all comments
  });

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <video
        src="/Assets/background.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      ></video>

      <div className="relative z-20 min-h-screen overflow-y-auto">
        <header className="absolute top-0 left-0 w-full h-16 flex items-center z-10">
          <Link href="/home" className="ml-4">
            <button className="text-darkerorange text-2xl font-semibold hover:underline">
              Back
            </button>
          </Link>
        </header>

        <div className="flex flex-col items-center w-full min-h-screen text-center z-20 pt-16">
          <h2 className="text-2xl text-darkerorange font-sans font-extrabold mb-2">
            {categories[0]}
          </h2>
          <h1 className="text-4xl text-teal font-serif mb-4 px-8">
            {texts[0]}
          </h1>

          {/* User Answer Box */}
          <div className="flex justify-center mt-4 w-full px-8">
            <div className="w-full max-w-screen-lg h-32 p-4 text-lg text-teal border border-gray-300 rounded-lg bg-white shadow-lg">
              Placeholder for your answer to the question...
            </div>
          </div>

          {/* Comment Section Toggle */}
          <div className="flex justify-center mt-4 w-full px-8">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full max-w-screen-lg h-12 p-4 text-lg text-teal border border-gray-300 rounded-lg bg-white shadow-lg text-left flex justify-between items-center"
            >
              <span>View Comments</span>
              <span>{dropdownOpen ? "▲" : "▼"}</span>
            </button>
          </div>

          {/* Filter Selector and Comment Section */}
          {dropdownOpen && (
            <div className="flex flex-col items-center w-full px-8 mt-4 space-y-4">
              {/* Filter Dropdown */}
              <div className="relative w-full max-w-screen-lg">
                <button
                  onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                  className="w-full h-12 p-4 text-lg text-teal border border-gray-300 rounded-lg bg-white shadow-lg text-left flex justify-between items-center"
                >
                  <span>Filter: {filter}</span>
                  <span>{filterDropdownOpen ? "▲" : "▼"}</span>
                </button>
                {filterDropdownOpen && (
                  <div className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-10">
                    <button
                      onClick={() => {
                        setFilter("All");
                        setFilterDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200 text-teal font-semibold"
                    >
                      All
                    </button>
                    <button
                      onClick={() => {
                        setFilter("Highest Red");
                        setFilterDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200 text-teal font-semibold"
                    >
                      Highest Red
                    </button>
                    <button
                      onClick={() => {
                        setFilter("Highest Blue");
                        setFilterDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200 text-teal font-semibold"
                    >
                      Highest Blue
                    </button>
                    <button
                      onClick={() => {
                        setFilter("Highest Neutral");
                        setFilterDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200 text-teal font-semibold"
                    >
                      Highest Neutral
                    </button>
                  </div>
                )}
              </div>

              {/* Filtered Comments */}
              {filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className="w-full max-w-screen-lg p-4 text-lg text-teal border border-gray-300 rounded-lg bg-white shadow-lg"
                >
                  <p>{option.text}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <button
                      onClick={() => handleUpvote(index)}
                      className={`flex items-center space-x-1 px-2 py-1 rounded ${
                        votes[index].userVoted === "up"
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      <img
                        src="/Assets/thumbs-up.png"
                        alt="Thumbs Up"
                        className="w-4 h-4"
                      />
                      <span>{votes[index].upvotes}</span>
                    </button>

                    <button
                      onClick={() => handleDownvote(index)}
                      className={`flex items-center space-x-1 px-2 py-1 rounded ${
                        votes[index].userVoted === "down"
                          ? "bg-red-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      <img
                        src="/Assets/thumbs-down.png"
                        alt="Thumbs Down"
                        className="w-4 h-4"
                      />
                      <span>{votes[index].downvotes}</span>
                    </button>
                  </div>

                  {/* Percentage Bar */}
                  <div className="mt-4 w-full h-4 flex rounded-full overflow-hidden">
                    <div
                      style={{ width: `${option.bluePercent}%` }}
                      className="bg-blue-500"
                    ></div>
                    <div
                      style={{ width: `${option.neutralPercent}%` }}
                      className="bg-gray-400"
                    ></div>
                    <div
                      style={{ width: `${option.redPercent}%` }}
                      className="bg-red-500"
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Intro;
