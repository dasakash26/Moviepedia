import React from "react";
import SearchBar from "./SearchBar";
function Hero({ movie, setLoading }) {
  return (
    <div className="bg-no-repeat bg-cover flex items-center justify-center text-center text-yellow-400 w-full h-[40rem] border border-blue-800 my-1 md:md-4 shadow-lg rounded-lg shadow-blue-800 bg-[url('https://i.ibb.co/8dRqygk/image.png')]">
      <div className="info px-6 py-10 md:px-20 md:py-14 bg-opacity-50 bg-black rounded-lg backdrop-blur-md">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight shadow-lg">
          Explore Movies Like Never Before
        </h1>
        <p className="text-lg md:text-2xl mb-8 shadow-lg">
          Discover the latest movies, reviews, and recommendations in one place.
        </p>
        <SearchBar movie={movie} setLoading={setLoading} />
      </div>
    </div>
  );
}

export default Hero;
