"use client";

import React, { useState } from "react";
import Link from "next/link";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", username, password);
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

      {/* Login Form with Blurred Glass Effect */}
      <div className="relative bg-eggshell bg-opacity-90 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-md w-full text-gray-900">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 drop-shadow-md">
          Log In
        </h2>

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
            className="w-full py-2 px-4 bg-theorange text-white font-semibold rounded-md hover:bg-darkerorange transition duration-200"
          >
            Log In
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-700">
            Don't have an account?{" "}
            <Link href="/signup" className="text-theorange hover:underline">
              Sign up!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
