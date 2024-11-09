import React, { useState, useEffect } from "react";
import Link from "next/link";

const Intro = () => {
  const texts = [
    "Was the 2024 Presidential Election Rigged?",
    "Is Spray Cheese Real?",
    "Who Will Make It to the Super Bowl?",
    "Who Does Not Deserve a Grammy Nomination?",
    "Is Fan Art a Real Art Form?",
    "Valorant: Should Chamber Be Nerfed?",
    "Should University Tuition Cost Less?",
    "Is the Metaverse Progress or Dystopian?",
    "Sephora, Ulta Beauty, or Drugstore Products?",
    "Is Harry Potter Really a Gryffindor?",
    "Are Workers' Unions Progressive or Mutiny?",
    "Should Disney Keep Making Live-Action Movies of Their Classics?",
  ];

  const categories = [
    "POLITICS",
    "FOOD",
    "SPORTS",
    "ENTERTAINMENT",
    "ART",
    "GAMING",
    "EDUCATION",
    "TECHNOLOGY",
    "BEAUTY",
    "LITERATURE",
    "LABOR",
    "MOVIES",
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 4000);

    const categoryInterval = setInterval(() => {
      setCategoryIndex((prevIndex) => (prevIndex + 1) % categories.length);
    }, 4000);

    return () => {
      clearInterval(textInterval);
      clearInterval(categoryInterval);
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* Background Video */}
      <video
        src="/Assets/background.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      ></video>

      {/* Header with Login Button */}
      <header className="absolute top-0 w-full bg-white bg-opacity-60 h-16 flex items-center justify-end px-8 z-10">
        <Link href="/login">
          <button className=" text-sky-400 text-2xl font-semibold">
            Login
          </button>
        </Link>
      </header>

      {/* Main Content */}
      <div className="relative flex flex-col justify-center items-center w-full h-full px-8 text-center">
        <h2 className="text-4xl text-sky-400 font-sans font-extrabold mb-2">
          {categories[categoryIndex]}
        </h2>
        <h1 className="text-8xl text-sky-400 font-serif mb-8 px-8">
          {texts[textIndex]}
        </h1>
        <Link href="/Discussion">
          <button className="text-sky-400 text-3xl bg-transparent border-none cursor-pointer py-4">
            Find out and Discuss!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Intro;
