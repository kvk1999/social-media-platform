import { useState, useEffect } from 'react';
import axios from 'axios';

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/profile');
      setProfile(response.data);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put('/api/profile', profileData);
      setProfile(response.data);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Failed to update profile');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, loading, error, updateProfile };
};

export default useProfile;
