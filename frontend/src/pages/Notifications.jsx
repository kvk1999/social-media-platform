import React, { useState } from 'react';

const Notifications = () => {
  const [notifications] = useState([
    { id: 1, message: 'You have a new friend request!' },
    { id: 2, message: 'Your post has 5 new likes.' },
    { id: 3, message: 'Your story was viewed by 10 people.' },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Notifications</h1>
      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="p-4 bg-white rounded-lg shadow-md"
            >
              <p className="text-gray-700">{notification.message}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No notifications available.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
