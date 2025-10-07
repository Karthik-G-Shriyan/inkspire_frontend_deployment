
import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <section
      className="w-full h-[90vh] bg-cover bg-center relative flex items-center justify-center"
      
      style={{
        backgroundImage: `url(${assets.hero_bg})`
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Inkspire</h1>
        <p className="text-lg md:text-2xl mb-6 italic">
          "Ideas grow here — explore, learn, and get inspired!"
        </p>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition">
          Explore Blogs
        </button>
      </div>
    </section>
  );
};

export default Hero;
