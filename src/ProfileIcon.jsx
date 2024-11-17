import React, { useState } from 'react';
import ProfileMenu from './ProfileMenu';

function ProfileIcon() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-center p-2 rounded-full cursor-pointer bg-blue-500 hover:bg-blue-600" onClick={handleMenuToggle}>
        <img className="w-10 h-10 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/men/1.jpg" alt="Profile Icon" />
      </div>
      {menuOpen && <ProfileMenu isOpen={menuOpen} />}
    </div>
  );
}

export default ProfileIcon;
