// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../services/userService'; // import the relevant service

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newProfileData, setNewProfileData] = useState({ name: '', bio: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getUserProfile();
      setUserProfile(profile);
    };
    fetchProfile();
  }, []);

  const handleProfileUpdate = async () => {
    const updatedProfile = await updateUserProfile(newProfileData);
    setUserProfile(updatedProfile); // Update the profile with new data
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      {isEditing ? (
        <div>
          <input 
            type="text" 
            value={newProfileData.name} 
            onChange={(e) => setNewProfileData({ ...newProfileData, name: e.target.value })} 
          />
          <textarea 
            value={newProfileData.bio} 
            onChange={(e) => setNewProfileData({ ...newProfileData, bio: e.target.value })} 
          />
          <button onClick={handleProfileUpdate}>Save</button>
        </div>
      ) : (
        <div>
          <h2>{userProfile?.name}</h2>
          <p>{userProfile?.bio}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
