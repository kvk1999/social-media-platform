import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-indigo-800 text-white shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <h1 className="text-lg font-bold">
          <Link to="/">Socialier</Link>
        </h1>

        {/* Hamburger Menu */}
        <button
          className="p-2 text-white md:hidden"
          onClick={toggleMenu}
        >
          ☰
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/profile" className="hover:text-gray-300">Profile</Link>
          <Link to="/notifications" className="hover:text-gray-300">Notifications</Link>
          <Link to="/settings" className="hover:text-gray-300">Settings</Link>
          <Link to="/login" className="hover:text-gray-300">Login</Link>
          <Link to="/register" className="hover:text-gray-300">Register</Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700">
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <Link to="/" className="hover:text-gray-300" onClick={toggleMenu}>Home</Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-gray-300" onClick={toggleMenu}>Profile</Link>
            </li>
            <li>
              <Link to="/notifications" className="hover:text-gray-300" onClick={toggleMenu}>Notifications</Link>
            </li>
            <li>
              <Link to="/settings" className="hover:text-gray-300" onClick={toggleMenu}>Settings</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-gray-300" onClick={toggleMenu}>Login</Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-gray-300" onClick={toggleMenu}>Register</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
