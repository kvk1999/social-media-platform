// /src/components/StoryCard.jsx
import React from 'react';

const StoryCard = ({ story }) => {
  return (
    <div className="relative">
      <img
        src={story.thumbnail}
        alt="Story Thumbnail"
        className="w-32 h-32 rounded-full object-cover mb-2"
      />
      <div className="absolute inset-0 bg-black opacity-40 rounded-full"></div>
      <p className="absolute bottom-0 left-0 text-white p-2">{story.username}</p>
    </div>
  );
};

export default StoryCard;
