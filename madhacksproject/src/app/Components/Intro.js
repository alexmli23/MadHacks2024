import React from 'react'
import Link from 'next/link'

const Intro = () => {
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
    <div className="relative flex flex-col justify-center items-center w-full h-full">
        <h1 className="text-8xl text-sky-400 font-serif">PLACEHOLDER</h1>
        <Link href="/Discussion">
            <button className="text-sky-400 text-5xl bg-transparent border-none cursor-pointer">
                Enter
            </button>
        </Link>
        <Link href="/Login">
            <button className="text-sky-400 text-5xl bg-transparent border-none cursor-pointer">
                Login
            </button>
        </Link>
    </div>
</div>
  )
}

export default Intro