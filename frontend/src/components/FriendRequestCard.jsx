// /src/components/FriendRequestCard.jsx
import React from 'react';

const FriendRequestCard = ({ request, onAccept, onReject }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex items-center">
        <img
          src={request.senderProfilePicture}
          alt="Sender"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h3 className="font-semibold">{request.senderName}</h3>
          <p className="text-gray-500 text-sm">{request.message}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => onAccept(request.id)}
          className="bg-green-500 text-white py-2 px-4 rounded-lg mr-2 hover:bg-green-600"
        >
          Accept
        </button>
        <button
          onClick={() => onReject(request.id)}
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default FriendRequestCard;
