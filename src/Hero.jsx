import React from "react";

function Hero() {
  return (
    <section className="relative w-full h-[70vh] sm:h-screen bg-cover bg-center flex items-center justify-center">
      {/* Darker Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-black/70 to-transparent"></div>

      {/* Hero Content */}
      <div className="relative bg-no-repeat bg-cover flex items-center text-center justify-center text-yellow-400 z-10 px-6 md:py-36 border-2 border-slate-500 shadow-lg rounded-lg shadow-blue-400 bg-[url('https://i.ibb.co/8dRqygk/image.png')]">
        <div className="info p-6 md:p-20 bg-opacity-5">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight shadow-lg">
            Explore Movies Like Never Before
          </h1>
          <p className="text-lg md:text-2xl mb-8 shadow-lg">
            Discover the latest movies, reviews, and recommendations in one place.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;

