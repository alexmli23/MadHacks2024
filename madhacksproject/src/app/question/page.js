"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Question = () => {
  const [interest, setInterest] = useState("");
  const [question, setQuestion] = useState("");
  const [buttonColor, setButtonColor] = useState("bg-blue-500");
  const [loading, setLoading] = useState(true);

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
    const fetchUserInterest = async () => {
      try {
        const storedUserId = localStorage.getItem('userId');
        if (!storedUserId) {
          console.error("User ID is missing in localStorage");
          return;
        }

        // Fetch the user's "today" interest (based on the stored userId)
        const response = await fetch(`http://localhost:5001/get-user-today/${storedUserId}`);
        const data = await response.json();

        if (response.ok && data.today) {
          const userInterest = data.today;
          setInterest(userInterest);

          // Find the corresponding question based on the "today" interest
          const selectedQuestion = interestQuestions.find(
            (item) => item.label === userInterest
          );
          if (selectedQuestion) {
            setQuestion(selectedQuestion.question);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    fetchUserInterest();
  }, []);

  // Ensure the component only renders when interest and question are available
  if (loading) {
    return <div>Loading...</div>; // Or display a loading spinner
  }

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
            {category ? category : '(Question)'}
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

export default Question;