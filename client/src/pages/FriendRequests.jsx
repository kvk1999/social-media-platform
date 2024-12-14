import React, { useEffect, useState } from 'react';
import { getFriendRequests, acceptFriendRequest, declineFriendRequest } from '../services/friendService'; // Import friend services

const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch friend requests when the component mounts
  useEffect(() => {
    const loadFriendRequests = async () => {
      try {
        const requests = await getFriendRequests();
        setFriendRequests(requests); // Set friend requests to the state
      } catch (error) {
        console.error('Failed to fetch friend requests', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    loadFriendRequests();
  }, []); // Re-run the effect when the component mounts

  // Handle accepting a friend request
  const handleAcceptRequest = async (userId) => {
    try {
      await acceptFriendRequest(userId);
      setFriendRequests((prevRequests) => prevRequests.filter(request => request.userId !== userId)); // Remove accepted request from the list
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  // Handle declining a friend request
  const handleDeclineRequest = async (userId) => {
    try {
      await declineFriendRequest(userId);
      setFriendRequests((prevRequests) => prevRequests.filter(request => request.userId !== userId)); // Remove declined request from the list
    } catch (error) {
      console.error('Error declining friend request:', error);
    }
  };

  if (loading) {
    return <div>Loading friend requests...</div>;
  }

  return (
    <div>
      <h1>Friend Requests</h1>
      <ul>
        {friendRequests.map((request) => (
          <li key={request.userId}>
            <p>{request.username} sent you a friend request.</p>
            <button onClick={() => handleAcceptRequest(request.userId)}>Accept</button>
            <button onClick={() => handleDeclineRequest(request.userId)}>Decline</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendRequests;
