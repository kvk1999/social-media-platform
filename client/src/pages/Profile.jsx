import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState({});

  // Fetch profile data
  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/profile');
      const data = await response.json();
      setProfile(data); // Set profile data to state
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    fetchProfile(); // Fetch profile when component mounts
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">User Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <img src={profile.avatarUrl} alt="Profile" className="w-32 h-32 rounded-full mx-auto" />
        <h2 className="text-xl font-semibold mt-4 text-center">{profile.username}</h2>
        <p className="text-center text-gray-500">{profile.email}</p>
        <p className="mt-4">{profile.bio}</p>
      </div>
    </div>
  );
};

export default Profile;
