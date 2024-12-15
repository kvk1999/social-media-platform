// /src/components/CommentCard.jsx
import React from 'react';

const CommentCard = ({ comment }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-4">
      <div className="flex items-center mb-2">
        <img
          src={comment.userProfilePicture}
          alt="User"
          className="w-8 h-8 rounded-full mr-2"
        />
        <span className="font-semibold text-sm">{comment.username}</span>
      </div>
      <p className="text-gray-700 text-sm">{comment.content}</p>
    </div>
  );
};

export default CommentCard;
