import React, { useState, useEffect } from "react";
import './Hero.css';

const Hero = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  const quotes = [
    { text: "Write what should not be forgotten", author: "Isabel Allende" },
    { text: "Today a reader, tomorrow a leader", author: "Margaret Fullern" },
    { text: "Your words can change the world", author: "Inkspire" },
    { text: "Books are a uniquely portable magic", author: "Stephen King" },
    { text: "Reading is dreaming with open eyes", author: "Anonymous" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleExploreBlog = () => {
    console.log("Navigating to blogs...");
  };

  const handleBecomeBlogger = () => {
    console.log("Navigating to blogger signup...");
  };

  return (
    <section className="relative w-full min-h-[120vh] flex items-center justify-center  overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 animate-gradient" />
      
      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
       

        {/* Main Heading with Animated Text */}
        <div className=" animate-fadeInUp">
          <h1 className="text-6xl md:text-8xl font-bold mb-5 tracking-tight">
            <span className="inline-block hover:scale-110 transition-transform duration-300">I</span>
            <span className="inline-block hover:scale-110 transition-transform duration-300">n</span>
            <span className="inline-block hover:scale-110 transition-transform duration-300">k</span>
            <span className="inline-block hover:scale-110 transition-transform duration-300 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">s</span>
            <span className="inline-block hover:scale-110 transition-transform duration-300">p</span>
            <span className="inline-block hover:scale-110 transition-transform duration-300">i</span>
            <span className="inline-block hover:scale-110 transition-transform duration-300">r</span>
            <span className="inline-block hover:scale-110 transition-transform duration-300 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">e</span>
          </h1>
          <div className="h-1 w-[25rem] mx-auto bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full animate-pulse" />
        </div>

        {/* Rotating Quotes */}
        <div className="mb-12 h-32 flex items-center justify-center">
          <div className="relative w-full max-w-3xl">
            {quotes.map((quote, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === currentQuote
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
              >
                <p className="text-2xl md:text-3xl font-light italic text-gray-100 mb-3">
                  "{quote.text}"
                </p>
                <p className="text-lg text-blue-300">— {quote.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Keywords */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fadeInUp animation-delay-400">
          {['Create', 'Inspire', 'Connect', 'Share', 'Grow'].map((keyword, i) => (
            <span
              key={keyword}
              className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-medium hover:bg-white/20 transition-all duration-300 hover:scale-110 cursor-default"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {keyword}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-fadeInUp animation-delay-600">
          <button
            onClick={handleExploreBlog}
            className="group relative px-10 py-5 bg-white text-purple-900 rounded-full font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:scale-105 active:scale-95 min-w-[220px] overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Explore Stories
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </button>

          <button
            onClick={handleBecomeBlogger}
            className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 hover:scale-105 active:scale-95 min-w-[220px] overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Start Writing
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-125" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          </button>
        </div>

        {/* Stats or Features */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm animate-fadeInUp animation-delay-800">
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
            <span className="text-2xl">✨</span>
            <span>Creative Community</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
            <span className="text-2xl">🚀</span>
            <span>Easy Publishing</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
            <span className="text-2xl">💡</span>
            <span>Endless Inspiration</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/70 text-xs uppercase tracking-wider">Scroll</span>
          <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      
    </section>
  );
};

export default Hero;