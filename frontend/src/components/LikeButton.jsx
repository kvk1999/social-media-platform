// /src/components/LikeButton.jsx
import React, { useState } from 'react';

const LikeButton = ({ likes }) => {
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    setLiked(!liked);
  };

  return (
    <button
      onClick={handleClick}
      className={`text-lg ${liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-600`}
    >
      {liked ? 'Unlike' : 'Like'} ({likes})
    </button>
  );
};

export default LikeButton;
