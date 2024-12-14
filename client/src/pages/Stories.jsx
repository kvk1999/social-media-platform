import React, { useState, useEffect } from 'react';

const Stories = () => {
  const [stories, setStories] = useState([]);

  // Fetch stories from the backend
  const fetchStories = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/stories');
      const data = await response.json();
      setStories(data); // Set the stories to state
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  useEffect(() => {
    fetchStories(); // Fetch stories when component mounts
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">User Stories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div key={story._id} className="p-4 bg-white shadow-md rounded-lg">
            <img src={story.imageUrl} alt="Story" className="w-full h-40 object-cover rounded-lg" />
            <p className="text-lg mt-2">{story.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
