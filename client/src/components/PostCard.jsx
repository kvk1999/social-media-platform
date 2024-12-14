// /src/components/PostCard.jsx
import React, { useState } from 'react';
import LikeButton from './LikeButton';
import CommentCard from './CommentCard';

const PostCard = ({ post }) => {
  const [comments, setComments] = useState(post.comments);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center mb-4">
        <img src={post.userProfilePicture} alt="User" className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h2 className="font-semibold">{post.username}</h2>
          <p className="text-gray-500 text-sm">{post.timestamp}</p>
        </div>
      </div>
      <p className="text-gray-800 mb-4">{post.content}</p>
      <LikeButton likes={post.likes} />
      <div className="mt-4">
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default PostCard;
