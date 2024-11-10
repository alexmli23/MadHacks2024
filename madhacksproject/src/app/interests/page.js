'use client';

import React, { useState } from 'react';
import Link from 'next/link';

function InterestsPage() {
    const [interests, setInterests] = useState({politics: false, food: false, sports: false, entertainment: false, art: false, gaming: false, education: false, technology: false, finance: false, beauty: false, literature: false, business: false, movies: false, fashion: false});

    const handleToggle = (interest) => {setInterests((prevInterests) => ({...prevInterests, [interest]: !prevInterests[interest], }));};

    const handleSubmit = (event) => {
      event.preventDefault();

      const selectedInterests = Object.keys(interests).filter((interest) => interests[interest]);
    };

    const selectedCount = Object.values(interests).filter(Boolean).length;

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      {/* Background Video */}
      <video
        src="/Assets/background.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      ></video>

      {/* Interests with Blurred Glass Effect */}
      <div>
        <h2 className="text-3xl text-darkerteal font-bold mb-6 text-gray-800 drop-shadow-md">Select at least <span className="text-orange">5 Interests</span> to start:</h2>
          
        <form onSubmit={handleSubmit} className="space-y-4 p-8 bg-eggshell bg-opacity-80 rounded-md shadow-md max-w-lg w-full">
          <div className="grid grid-cols-2 gap-4">
          {Object.keys(interests).map((interest) => (
                <button
                  type="button"
                  key={interest}
                  onClick={() => handleToggle(interest)}
                  className={`py-2 px-4 bg-eggshell text-teal rounded-md font-semibold transition duration-200 ${
                    interests[interest] ? 'bg-teal text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {interest.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </button>
              ))}
            </div>

            <button type="submit" className={`w-full py-2 px-4 font-semibold rounded-md transition duration-200 ${selectedCount >= 5 ? "bg-orange text-white hover:bg-darkerorange" : "bg-gray-400 cursor-not-allowed"}`} disabled={selectedCount < 5}>DONE</button>
            {/* TODO: add data connection, then send to the spinny wheel/all categories page */}
          </form>
      </div>
    </div>
  );
}

export default InterestsPage;