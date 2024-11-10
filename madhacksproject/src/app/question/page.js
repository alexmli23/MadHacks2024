"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const Question = () => {
  const [interest, setInterest] = useState("");
  const [question, setQuestion] = useState("");
  const [buttonColor, setButtonColor] = useState("bg-blue-500");
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState("");
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
    const fetchUserInterest = async () => {
      const storedUserId = localStorage.getItem('userId');
      if (!storedUserId) {
        console.error("User ID is missing in localStorage");
        alert("Please log in again.");
        router.push('/login');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5001/get-user-today/${storedUserId}`);
        const data = await response.json();

        if (response.ok && data.today) {
          const userInterest = data.today;
          setInterest(userInterest);
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
        setLoading(false);
      }
    };

    fetchUserInterest();
  }, []);

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      console.error("User ID is missing in localStorage");
      alert("Please log in again.");
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/save-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: storedUserId,
          interest: interest,
          answer: answer,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Answer saved successfully');
        router.push('/answers');
      } else {
        console.error('Error saving answer:', data.message);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
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
            {interest ? interest : '(Interest)'}
          </div>
          <div className="bg-gray-200 text-gray-800 border border-gray-800 p-4 rounded-md w-full text-center">
            {question ? question : '(Question)'}
          </div>
          <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
            <textarea
              value={answer}
              onChange={handleAnswerChange}
              placeholder="Your answer"
              className="w-full h-32 p-2 border border-gray-400 rounded-md resize-none focus:outline-none focus:border-blue-500 text-black"
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
