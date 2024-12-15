import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FriendRequests = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    // Fetch friend requests from API
    axios.get('/api/v1/friend')
      .then((response) => setFriends(response.data))
      .catch((error) => console.error('Error fetching friends:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto max-w-lg">
        <h2 className="text-xl font-bold mb-4">Friend Requests</h2>
        <div className="space-y-4">
          {friends.map((friend) => (
            <div key={friend.id} className="flex items-center p-4 bg-white rounded-lg shadow-md">
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div className="flex-1">
                <h3 className="text-gray-800">{friend.name}</h3>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                    Accept
                  </button>
                  <button className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendRequests;
