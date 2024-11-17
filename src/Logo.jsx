import React from "react";

function Logo() {
  return (
    <div className="logo text-white text-4xl font-bold flex items-center space-x-2 shadow-lg">
      <img
        className="h-10 mx-2"
        src="https://uxwing.com/wp-content/themes/uxwing/download/video-photography-multimedia/film-movie-icon.png"
        alt="logo"
      />
      <div className="search flex items-center text-[#4592da]">Moviepedia</div>
    </div>
  );
}

export default Logo;
