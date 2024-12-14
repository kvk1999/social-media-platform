import { useState, useEffect } from 'react';
import axios from 'axios';

const useFriends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFriends = async () => {
    try {
      const response = await axios.get('/api/friends');
      setFriends(response.data);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Failed to load friends');
    } finally {
      setLoading(false);
    }
  };

  const sendFriendRequest = async (userId) => {
    try {
      await axios.post(`/api/friends/request`, { userId });
      fetchFriends();
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Failed to send friend request');
    }
  };

  const acceptFriendRequest = async (userId) => {
    try {
      await axios.post(`/api/friends/accept`, { userId });
      fetchFriends();
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Failed to accept friend request');
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return { friends, loading, error, sendFriendRequest, acceptFriendRequest };
};

export default useFriends;
