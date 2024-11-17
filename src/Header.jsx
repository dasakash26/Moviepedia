import React from "react";
import Logo from "./Logo";
import ProfileIcon from "./ProfileIcon";

function Header() {
  return (
    <header className="sticky top-4 w-[90vw] md:w-[80vw] mx-auto my-3 md:my-4 p-2 bg-[#011d2c]/70 border-2 border-blue-800 backdrop-blur-sm rounded-lg shadow-md flex flex-col sm:flex-row items-center z-50 justify-between">
      <Logo />
      <ProfileIcon />
    </header>
  );
}

export default Header;
