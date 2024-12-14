// /src/context/StoryContext.js
import React, { createContext, useState, useEffect } from 'react';

const StoryContext = createContext();

export const StoryProvider = ({ children }) => {
  const [stories, setStories] = useState([]);

  // Simulate fetching stories from an API
  useEffect(() => {
    const fetchStories = async () => {
      const response = await fetch('/api/stories');
      const data = await response.json();
      setStories(data);
    };
    fetchStories();
  }, []);

  const addStory = (newStory) => {
    setStories([newStory, ...stories]);
  };

  return (
    <StoryContext.Provider value={{ stories, addStory }}>
      {children}
    </StoryContext.Provider>
  );
};

export default StoryContext;
