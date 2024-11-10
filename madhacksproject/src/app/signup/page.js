'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation'; // Updated import for `useRouter` from Next.js app directory

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [interests, setInterests] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const router = useRouter(); // Initialize the router

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const payload = { name, email, password, interests };
    console.log('Signup data:', { name, email, interests });

    try {
      // Send the signup data to your backend
      const response = await fetch('http://localhost:5001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('Signup successful:', data);
        setSubmitted(true);
        // Redirect to the "interests" page after submission
        router.push('/interests');
      } else {
        console.log('Signup error:', data);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

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

      {/* Header with Login Button */}
      <header className="absolute top-0 w-full bg-eggshell bg-opacity-60 h-16 flex items-center justify-end px-8 z-10">
        <Link href="/interests">
          <button className=" text-darkerorange text-2xl font-semibold text-theorange hover:underline">
            temp to interests
          </button>
        </Link>
      </header>

      {/* Sign Up Form with Blurred Glass Effect */}
      <div className="relative bg-eggshell bg-opacity-90 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-md w-full text-gray-900">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 drop-shadow-md">Sign Up</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username:</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="Choose your username" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email:</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password:</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Choose your password" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Conditionally render the button */}
          {!submitted && (
            <button type="submit" className="w-full py-2 px-4 bg-orange text-white font-semibold rounded-md hover:bg-darkerorange transition duration-200">
              Next
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignupPage;