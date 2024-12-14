// /src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="text-white text-xl font-bold">
          <Link to="/">SocialApp</Link>
        </div>
        <div>
          <Link to="/" className="text-white px-4 hover:text-gray-300">
            Home
          </Link>
          <Link to="/profile" className="text-white px-4 hover:text-gray-300">
            Profile
          </Link>
          <Link to="/notifications" className="text-white px-4 hover:text-gray-300">
            Notifications
          </Link>
          <Link to="/login" className="text-white px-4 hover:text-gray-300">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
