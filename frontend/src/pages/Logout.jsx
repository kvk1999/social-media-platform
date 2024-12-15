import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-bold text-center text-gray-700">Are you sure you want to logout?</h2>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 mb-4 font-semibold text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
        <button
          onClick={() => navigate(-1)}
          className="w-full px-4 py-2 font-semibold text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Logout;
