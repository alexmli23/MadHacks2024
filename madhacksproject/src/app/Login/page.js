'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook
import Link from 'next/link';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Initialize the router

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        // Redirect to the discussion page after successful login
        router.push('/Discussion');
      } else {
        setError(data.message); // Display the error message
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      console.error('Error during login:', error);
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

<Link href="/"> <img src="/Assets/logo_icon.png" alt="the Orange Opinions Icon" className="absolute top-6 left-7 h-13 w-full max-w-[80px] object-contain mx-auto"/></Link>

      {/* Login Form with Blurred Glass Effect */}
      <div className="relative bg-eggshell bg-opacity-90 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-md w-full text-gray-900">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 drop-shadow-md">
          Log In
        </h2>

        {error && (
          <div className="text-red-600 text-center mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange text-white font-semibold rounded-md hover:bg-darkerorange transition duration-200"
          >
            Log In
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-700">
            Don't have an account?{' '}
            <Link href="/signup" className="text-orange hover:underline">
              Sign up!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;