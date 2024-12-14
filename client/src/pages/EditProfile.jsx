// src/pages/EditProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../services/userService'; 

const EditProfile = () => {
  const [userProfile, setUserProfile] = useState({ name: '', bio: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getUserProfile();
      setUserProfile(profile);
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    await updateUserProfile(userProfile);
    // Redirect or show success message
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <input 
        type="text" 
        value={userProfile.name} 
        onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
      />
      <textarea 
        value={userProfile.bio} 
        onChange={(e) => setUserProfile({ ...userProfile, bio: e.target.value })}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditProfile;
