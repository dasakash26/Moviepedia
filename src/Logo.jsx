import React from "react";

function Logo() {
  return (
    <div className="logo text-white text-4xl font-semibold flex items-center">
      <img
        className="h-9 mx-1"
        src="https://uxwing.com/wp-content/themes/uxwing/download/video-photography-multimedia/film-movie-icon.png"
        alt="logo"
      />
      <div className="search flex items-center text-[#4592da]">Moviepedia</div>
    </div>
  );
}

export default Logo;
