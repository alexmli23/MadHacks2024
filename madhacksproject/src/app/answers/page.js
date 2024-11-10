"use client";

import React, { useState } from "react";
import Link from "next/link";

const Intro = () => {
  const texts = ["Was the 2024 Presidential Election Rigged?"];
  const categories = ["POLITICS"];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const options = [
    "Comment 1: Interesting perspective!",
    "Comment 2: I disagree with this.",
    "Comment 3: Could be possible!",
    "Comment 4: Needs more evidence.",
  ];

  // Initialize states for each comment's upvotes, downvotes, and voting status
  const initialVotes = options.map(() => ({
    upvotes: 0,
    downvotes: 0,
    userVoted: null, // null = no vote, 'up' = upvote, 'down' = downvote
  }));
  const [votes, setVotes] = useState(initialVotes);

  // Handle upvote
  const handleUpvote = (index) => {
    setVotes((prevVotes) =>
      prevVotes.map((vote, i) => {
        if (i === index) {
          if (vote.userVoted === "down") {
            return {
              ...vote,
              upvotes: vote.upvotes + 1,
              downvotes: vote.downvotes - 1,
              userVoted: "up",
            };
          } else if (vote.userVoted === null) {
            return { ...vote, upvotes: vote.upvotes + 1, userVoted: "up" };
          }
        }
        return vote;
      })
    );
  };

  // Handle downvote
  const handleDownvote = (index) => {
    setVotes((prevVotes) =>
      prevVotes.map((vote, i) => {
        if (i === index) {
          if (vote.userVoted === "up") {
            return {
              ...vote,
              upvotes: vote.upvotes - 1,
              downvotes: vote.downvotes + 1,
              userVoted: "down",
            };
          } else if (vote.userVoted === null) {
            return {
              ...vote,
              downvotes: vote.downvotes + 1,
              userVoted: "down",
            };
          }
        }
        return vote;
      })
    );
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Fixed Background Video */}
      <video
        src="/Assets/background.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      ></video>

      {/* Scrollable Content */}
      <div className="relative z-20 min-h-screen overflow-y-auto">
        {/* Header with Back Button */}
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

          {/* Comment Section */}
          {dropdownOpen && (
            <div className="flex flex-col items-center w-full px-8 mt-2 space-y-4">
              {options.map((option, index) => (
                <div
                  key={index}
                  className="w-full max-w-screen-lg p-4 text-lg text-teal border border-gray-300 rounded-lg bg-white shadow-lg"
                >
                  <p>{option}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    {/* Upvote Button */}
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

                    {/* Downvote Button */}
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
