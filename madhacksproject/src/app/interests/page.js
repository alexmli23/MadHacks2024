'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function InterestsPage() {
  const [userId, setUserId] = useState(null);
  const [interests, setInterests] = useState({
    Politics: false,
    Food: false,
    Sports: false,
    Entertainment: false,
    Art: false,
    Gaming: false,
    Education: false,
    Tech: false,
    Finance: false,
    Beauty: false,
    Literature: false,
    Business: false,
    Movies: false,
    Fashion: false,
  });

  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    console.log('Retrieved userId:', storedUserId); // Debugging
    setUserId(storedUserId);
  }, []);

  const handleToggle = (interest) => {
    setInterests((prevInterests) => ({ ...prevInterests, [interest]: !prevInterests[interest] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedInterests = Object.keys(interests).filter((interest) => interests[interest]);

    console.log('userId:', userId); // Debugging
    console.log('selectedInterests:', selectedInterests); // Debugging

    if (!userId) {
      console.error('No userId found');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/update-interests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          interests: selectedInterests,
        }),
      });

      if (response.ok) {
        console.log('Interests updated successfully');
        // Redirect to the "discussion" page after signup
        router.push('/Discussion');
      } else {
        const errorData = await response.json();
        console.error('Failed to update interests:', errorData.message);
      }
    } catch (error) {
      console.error('Error during interests update:', error);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <video src="/Assets/background.mp4" autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover -z-10"></video>

      <div>
        <h2 className="text-3xl text-darkerteal font-bold mb-6 text-gray-800 drop-shadow-md">Select at least <span className="text-orange">5 Interests</span> to start:</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(interests).map((interest) => (
            <button
              type="button"
              key={interest}
              onClick={() => handleToggle(interest)}
              className={`py-2 px-4 bg-eggshell text-teal rounded-md font-semibold transition duration-200 ${interests[interest] ? 'bg-teal text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              {interest.charAt(0).toUpperCase() + interest.slice(1)}
            </button>
          ))}
        </div>

        <button type="submit" className="w-full py-2 px-4 font-semibold rounded-md transition duration-200 bg-orange text-white hover:bg-darkerorange">
          DONE
        </button>
      </form>
      </div>
    </div>
  );
}

export default InterestsPage;