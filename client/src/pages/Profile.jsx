import React, { useState, useEffect } from 'react';
import { getUserById, updateUser, deleteUser } from '../services/userService'; 

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const userId = 1; // Replace with the actual user ID (could be from state, context, or props)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserById(userId);
        setUserProfile(profile);
      } catch (err) {
        setError('Error fetching user profile');
      }
    };
    fetchProfile();
  }, [userId]);

  const handleUpdate = async () => {
    const updatedProfile = { name: 'Jane Doe', bio: 'Updated bio' };
    try {
      const updatedUser = await updateUser(userId, updatedProfile);
      setUserProfile(updatedUser);
    } catch (err) {
      setError('Error updating user profile');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteUser(userId);
      console.log(response.message); // e.g., "User deleted successfully"
      setUserProfile(null); // Clear the profile data after deletion
    } catch (err) {
      setError('Error deleting user profile');
    }
  };

  if (error) return <div>{error}</div>;
  if (!userProfile) return <div>Loading...</div>;

  return (
    <div>
      <h2>{userProfile.name}</h2>
      <p>{userProfile.bio}</p>
      <button onClick={handleUpdate}>Update Profile</button>
      <button onClick={handleDelete}>Delete Profile</button>
    </div>
  );
};

export default Profile;
