'use client';

import React, { useState } from 'react';
import Link from 'next/link';  // Ensure Link is imported

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Perform login logic here, e.g., send credentials to a backend server
    console.log('Logging in with:', username, password);
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center"> {/* White background */}
      <div className="p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-black">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-lg text-black">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg text-black">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded mt-4">
            Login
          </button>
        </form>
        
        <div className="mt-6 text-center text-black">
          <p>
            Don't have an account?
            <Link href="/signup" className="text-blue-500">
              Sign up!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;