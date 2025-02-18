import React from "react";
import { FaFilm } from "react-icons/fa";

function Logo() {
  return (
    <div className="flex items-center gap-2.5 group cursor-pointer">
      <FaFilm
        className="text-2xl text-blue-400 group-hover:text-blue-300 
        transform group-hover:rotate-12 transition-all duration-300"
      />
      <div className="flex items-center gap-2">
        <span className="text-xl font-semibold text-gray-100 group-hover:text-white">
          Movie
          <span className="text-blue-400 group-hover:text-blue-300">pedia</span>
        </span>
        <span
          className="px-1.5 py-0.5 text-[0.65rem] font-medium bg-blue-900/40 
          text-blue-300 rounded-md border border-blue-800/50"
        >
          v1.3
        </span>
      </div>
    </div>
  );
}

export default Logo;
