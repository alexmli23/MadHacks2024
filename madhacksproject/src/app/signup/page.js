'use client';

import React, { useState } from 'react';
import Link from 'next/link';

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically make an API call to send the signup data to your backend
    console.log('Signup data:', { name, email, password, checked });
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
          {/* <div>
              <label htmlFor="interests">Pick your interests! (Minimum of 5)</label>
              <input type="checkbox"
          </div> */}
          <button type="submit" className="w-full py-2 px-4 bg-theorange text-white font-semibold rounded-md hover:bg-darkerorange transition duration-200">Next</button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-700">Already have an account?{" "}<Link href="/login" className="text-theorange hover:underline">
              Log In
            </Link>
          </p>
        </div>
        </div>        
    </div>
  );
}

export default SignupPage;