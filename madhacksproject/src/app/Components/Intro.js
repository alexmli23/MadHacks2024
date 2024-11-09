import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Intro = () => {
  const texts = [
    "Was the 2024 Presidential election rigged?", 
    "Is spray cheese real?", 
    "Who will make it to the SuperBowl?", 
    "Who does not deserve a Grammy nomination?",
    "Is fanart a real art form?",
    "Valorant: Should Chamber be nerfed?",
    "Should university tuition cost less?",
    "Is the Metaverse progress or dystopian?",
    "Sephora, Ulta Beauty, or drug store products?",
    "Is Harry Potter really a Gryffindor?",
    "Are workers unions progressive or mutiny?",
    "Should Disney keep making live action movies of their classics?"
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
    "MOVIES"
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
      <video
        src="/Assets/background.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      ></video>
      <div className="absolute top-5 right-5 z-10">
        <Link href="/Login">
          <button className="text-sky-100 text-5xl bg-black bg-opacity-50 p-3 rounded">
            Login
          </button>
        </Link>
      </div>
      <div className="relative flex flex-col justify-center items-center w-full h-full px-8 text-center">
        <h2 className="text-4xl text-sky-400 font-sans font-extrabold mb-2">
          {categories[categoryIndex]}
        </h2>
        <h1 className="text-8xl text-sky-400 font-serif mb-8 px-8">
          {texts[textIndex]}
        </h1>
        <Link href="/Discussion">
          <button className="text-sky-400 text-3xl bg-transparent border-none cursor-pointer py-44 fixed bottom-10 inset-x-0 mx-auto text-center">
            Find out and Discuss!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Intro;
