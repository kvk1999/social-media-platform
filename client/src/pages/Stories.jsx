// src/pages/StoriesPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchStories } from '../services/storyService';

const Stories = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const getStories = async () => {
      const fetchedStories = await fetchStories();
      setStories(fetchedStories);
    };
    getStories();
  }, []);

  return (
    <div>
      <h2>Stories</h2>
      {stories.map((story) => (
        <div key={story.id}>
          <p>{story.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Stories;
