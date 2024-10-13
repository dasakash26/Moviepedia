import React from "react";
import SearchBar from "./SearchBar";
import Logo from "./Logo";

function Header({ movie, setLoading }) {
  return (
    <header className="fixed top-3 w-[90vw] md:w-[80vw] p-[0.5rem] bg-[#011d2c]/50 border-2 border-slate-500 bg-opacity-50 backdrop-blur-lg rounded-lg shadow-md z-10 flex flex-col sm:flex-row items-center justify-between">
      <Logo />
      <SearchBar movie={movie} setLoading={setLoading} />
    </header>
  );
}

export default Header;
