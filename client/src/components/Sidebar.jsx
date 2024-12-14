// /src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white p-6">
      <div className="mb-6">
        <h2 className="font-semibold text-lg">Menu</h2>
      </div>
      <ul>
        <li>
          <Link to="/" className="block py-2 hover:bg-gray-700 rounded">
            Home
          </Link>
        </li>
        <li>
          <Link to="/profile" className="block py-2 hover:bg-gray-700 rounded">
            Profile
          </Link>
        </li>
        <li>
          <Link to="/friends" className="block py-2 hover:bg-gray-700 rounded">
            Friends
          </Link>
        </li>
        <li>
          <Link to="/settings" className="block py-2 hover:bg-gray-700 rounded">
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
