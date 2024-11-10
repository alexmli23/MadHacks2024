"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const Intro = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [userId, setUserId] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [todayInterest, setTodayInterest] = useState("");
  const [questionText, setQuestionText] = useState("");
  const router = useRouter();

  const interestQuestions = [
    { label: 'Politics', question: 'Was the 2024 Presidential Election Rigged?' },
    { label: 'Food', question: 'Is Spray Cheese Real?' },
    { label: 'Sports', question: 'Who Will Make It to the Super Bowl?' },
    { label: 'PopCulture', question: 'Who Does Not Deserve a Grammy Nomination?' },
    { label: 'Art', question: 'Is Fan Art a Real Art Form?' },
    { label: 'Gaming', question: 'Valorant: Should Chamber Be Nerfed?' },
    { label: 'ScienceEducation', question: 'Should University Tuition Cost Less?' },
    { label: 'Tech', question: 'Is the Metaverse Innovation or Dystopian?' },
    { label: 'FinanceEconomics', question: 'What is your take on the current economic trends?' },
    { label: 'Beauty', question: 'Sephora, Ulta Beauty, or Drugstore Products?' },
    { label: 'Books', question: 'Is Harry Potter Really a Gryffindor?' },
    { label: 'Business', question: 'Are Workers\' Unions Beneficial or Mutiny?' },
    { label: 'TVMovies', question: 'Should Disney Keep Making Live-Action Movies of Their Classics?' },
    { label: 'Fashion', question: 'What\'s a Trend that Should Stop?' },
  ];

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

  // Initialize votes with upvotes and downvotes for each comment
  const initialVotes = options.map(() => ({
    upvotes: 0,
    downvotes: 0,
    userVoted: null,
  }));
  const [votes, setVotes] = useState(initialVotes);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      console.error("User ID is missing in localStorage");
      alert("Please log in again.");
      router.push('/login');
      return;
    }
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5001/find-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId })
        });

        if (response.ok) {
          const data = await response.json();
          setUserAnswer(data.answer);
          setTodayInterest(data.todayInterest);
        } else {
          console.error("Error fetching user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    if (todayInterest) {
      const selectedQuestion = interestQuestions.find(
        (item) => item.label === todayInterest
      );
      setQuestionText(selectedQuestion ? selectedQuestion.question : "No question available.");
    }
  }, [todayInterest]);

   // Upvote function
   const handleUpvote = (index) => {
    setVotes((prevVotes) =>
      prevVotes.map((vote, i) =>
        i === index
          ? { ...vote, upvotes: vote.upvotes + 1, userVoted: "up" }
          : vote
      )
    );
  };

  // Downvote function
  const handleDownvote = (index) => {
    setVotes((prevVotes) =>
      prevVotes.map((vote, i) =>
        i === index
          ? { ...vote, downvotes: vote.downvotes + 1, userVoted: "down" }
          : vote
      )
    );
  };

  // Combine options and votes, then sort based on the selected filter
  const combinedData = options.map((option, index) => ({
    ...option,
    ...votes[index],
  }));

  const sortedOptions = combinedData
    .sort((a, b) => {
      if (filter === "Most Likes") return b.upvotes - a.upvotes;
      if (filter === "Most Dislikes") return b.downvotes - a.downvotes;
      return 0;
    })
    .filter((option) => {
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
            {todayInterest}
          </h2>
          <h1 className="text-4xl text-teal font-serif mb-4 px-8">
            {questionText}
          </h1>

          <div className="flex justify-center mt-4 w-full px-8">
            <div className="w-full max-w-screen-lg h-32 p-4 text-lg text-teal border border-gray-300 rounded-lg bg-white shadow-lg">
              {userAnswer}
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
                    {[
                      "All",
                      "Highest Red",
                      "Highest Blue",
                      "Highest Neutral",
                      "Most Likes",
                      "Most Dislikes",
                    ].map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setFilter(option);
                          setFilterDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-200 text-teal font-semibold"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Filtered Comments */}
              {sortedOptions.map((option, index) => (
                <div
                  key={index}
                  className="w-full max-w-screen-lg p-4 text-lg text-teal border border-gray-300 rounded-lg bg-white shadow-lg"
                >
                  <p>{option.text}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <button
                      onClick={() => handleUpvote(index)}
                      className={`flex items-center space-x-1 px-2 py-1 rounded ${
                        option.userVoted === "up"
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      <img
                        src="/Assets/thumbs-up.png"
                        alt="Thumbs Up"
                        className="w-4 h-4"
                      />
                      <span>{option.upvotes}</span>
                    </button>

                    <button
                      onClick={() => handleDownvote(index)}
                      className={`flex items-center space-x-1 px-2 py-1 rounded ${
                        option.userVoted === "down"
                          ? "bg-red-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      <img
                        src="/Assets/thumbs-down.png"
                        alt="Thumbs Down"
                        className="w-4 h-4"
                      />
                      <span>{option.downvotes}</span>
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
