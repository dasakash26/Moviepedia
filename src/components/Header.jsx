import React from "react";
import Logo from "./Logo";
import ProfileIcon from "./ProfileIcon";
import { FaHeart } from "react-icons/fa";
import { Movie } from "@mui/icons-material";

function Header() {
  return (
    <header
      className="sticky top-4 w-full max-w-7xl mx-auto my-3 md:my-5 p-3.5 md:p-5 
      bg-gradient-to-r from-[#011d2c]/95 to-[#012a40]/95 
      border border-blue-800/60 hover:border-blue-600/60 
      backdrop-blur-xl rounded-2xl 
      shadow-2xl hover:shadow-blue-900/40
      transform hover:-translate-y-0.5
      transition-all duration-300 ease-in-out
      flex items-center justify-between z-50"
    >
      <Logo />

      <Movie className="text-4xl text-blue-400" />
    </header>
  );
}

export default Header;
