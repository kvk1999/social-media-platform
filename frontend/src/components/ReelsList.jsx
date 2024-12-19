import React, { useContext } from 'react';
import { ReelsContext } from '../context/PostContext';

const ReelsList = () => {
  const { reels, loading } = useContext(ReelsContext);

  if (loading) return <p className="text-center text-lg font-bold">Loading reels...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {reels.map((reel) => (
        <div key={reel._id} className="bg-white shadow-md rounded-lg p-4">
          <h3 className="font-semibold text-lg">{reel.title}</h3>
          <video
            className="rounded mt-2"
            controls
            src={reel.videoUrl}
            alt={reel.title}
          />
          <p className="text-sm mt-2 text-gray-600">{reel.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ReelsList;
