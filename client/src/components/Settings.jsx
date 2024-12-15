import React from 'react';
import { Link } from 'react-router-dom';

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto max-w-lg p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Username</span>
            <input
              type="text"
              placeholder="Enter your username"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
          <button className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
