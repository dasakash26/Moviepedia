import React from 'react';

function ProfileMenu({ isOpen }) {
  return (
    <div
      className={`absolute z-1 md:top-12 md:right-4 w-48 bg-gray-800 rounded-md shadow-lg py-1 transform transition-transform duration-500 ease-in-out ${
        isOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
      }`}
      style={{ willChange: 'transform, opacity' }}
    >
      <a href="/profile" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">
        Your Profile
      </a>
      <a href="/settings" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">
        Settings
      </a>
      <a href="/logout" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">
        Sign out
      </a>
    </div>
  );
}

export default ProfileMenu;
