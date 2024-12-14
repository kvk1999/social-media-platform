// /src/context/FriendContext.js
import React, { createContext, useState, useEffect } from 'react';

const FriendContext = createContext();

export const FriendProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  // Simulate fetching friends and requests from an API
  useEffect(() => {
    const fetchFriends = async () => {
      const response = await fetch('/api/friends');
      const data = await response.json();
      setFriends(data);
    };
    const fetchRequests = async () => {
      const response = await fetch('/api/friend-requests');
      const data = await response.json();
      setFriendRequests(data);
    };

    fetchFriends();
    fetchRequests();
  }, []);

  const sendFriendRequest = (request) => {
    setFriendRequests([...friendRequests, request]);
  };

  const acceptFriendRequest = (requestId) => {
    const acceptedRequest = friendRequests.find(request => request.id === requestId);
    setFriends([...friends, acceptedRequest]);
    setFriendRequests(friendRequests.filter(request => request.id !== requestId));
  };

  const rejectFriendRequest = (requestId) => {
    setFriendRequests(friendRequests.filter(request => request.id !== requestId));
  };

  return (
    <FriendContext.Provider value={{
      friends, friendRequests, sendFriendRequest, acceptFriendRequest, rejectFriendRequest
    }}>
      {children}
    </FriendContext.Provider>
  );
};

export default FriendContext;
