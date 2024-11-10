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
        </div>
      </div>
    </div>
  );
};

export default Intro;
