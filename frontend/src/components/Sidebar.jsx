import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Menu */}
      <button
        className="p-2 text-gray-700 hover:text-white bg-gray-300 hover:bg-gray-500 rounded-md"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '250px' }}
      >
        <button
          className="absolute top-2 right-2 text-xl text-white"
          onClick={toggleSidebar}
        >
          ✖
        </button>
        <ul className="mt-10 space-y-4">
          <li className="px-4 py-2 hover:bg-gray-700">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700">
            <Link to ="/friends">Friends</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700">
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
