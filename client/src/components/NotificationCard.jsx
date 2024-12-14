// /src/components/NotificationCard.jsx
import React from 'react';

const NotificationCard = ({ notification }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
      <div className="flex items-center">
        <img
          src={notification.senderProfilePicture}
          alt="Sender"
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <p className="font-semibold">{notification.senderName}</p>
          <p className="text-gray-600 text-sm">{notification.message}</p>
        </div>
      </div>
      <p className="text-gray-500 text-xs">{notification.timestamp}</p>
    </div>
  );
};

export default NotificationCard;
