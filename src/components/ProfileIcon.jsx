import React, { useState } from "react";
import ProfileMenu from "./ProfileMenu";

function ProfileIcon() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center justify-center p-1 rounded-lg cursor-pointer 
        bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
        transform transition-all duration-200 hover:scale-105 shadow-lg"
        onClick={handleMenuToggle}
      >
        <div className="relative">
          <img
            className="w-12 h-12 rounded-lg border-2 border-white hover:border-blue-200 
            transition-all duration-200"
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="Profile Icon"
          />
        </div>
      </div>
      {menuOpen && (
        <div
          className="absolute right-0 mt-2 transform transition-all duration-200 
          ease-out origin-top-right rounded-lg overflow-hidden"
        >
          <ProfileMenu isOpen={menuOpen} />
        </div>
      )}
    </div>
  );
}

export default ProfileIcon;
