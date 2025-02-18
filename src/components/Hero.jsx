import React from "react";
import SearchBar from "./SearchBar";

function Hero({ movie, setLoading }) {
  return (
    <div className="relative bg-no-repeat bg-cover flex items-center justify-center text-center w-full min-h-[32rem] md:h-[38rem] border border-sky-500/20 my-2 md:my-6 shadow-lg rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-sky-500/40">
      {/* Background with improved opacity */}
      <div className="absolute inset-0 bg-[url('https://i.ibb.co/8dRqygk/image.png')] bg-cover opacity-75 transform scale-105"></div>
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-blue-900/50 to-blue-950/70 backdrop-blur-[3px]"></div>

      <div className="info relative w-full max-w-3xl mx-auto px-4 py-8 md:py-12">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          Your Gateway to
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-200 to-white mt-2 drop-shadow-[0_2px_6px_rgba(234,179,8,0.7)]">
            Cinematic Wonders
          </span>
        </h1>
        <p className="text-base md:text-xl mb-8 text-white/95 max-w-2xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          Discover the latest movies, reviews, and recommendations in one place.
        </p>
        <div className="max-w-2xl mx-auto px-4">
          <SearchBar movie={movie} setLoading={setLoading} />
        </div>
      </div>
    </div>
  );
}

export default Hero;
