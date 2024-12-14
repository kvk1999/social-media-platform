import React, { useEffect, useState } from 'react';
import { createStory, getAllStories, getStoryById, deleteStory } from '../services/storyService'; // Importing story services

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [newStory, setNewStory] = useState(''); // State for new story input
  const [error, setError] = useState(null); // State for error handling

  // Fetch all stories
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const allStories = await getAllStories();
        setStories(allStories); // Set the stories to state
      } catch (error) {
        setError('Failed to fetch stories');
      }
    };

    fetchStories();
  }, []);

  // Handle adding a new story
  const handleAddStory = async () => {
    if (newStory.trim()) {
      try {
        const storyData = { content: newStory };
        const addedStory = await createStory(storyData);
        setStories([...stories, addedStory]); // Add the new story to the list
        setNewStory(''); // Clear the input field
      } catch (error) {
        setError('Failed to add story');
      }
    }
  };

  // Handle deleting a story
  const handleDeleteStory = async (storyId) => {
    try {
      await deleteStory(storyId); // Call delete function from service
      setStories(stories.filter(story => story.id !== storyId)); // Remove the deleted story from the list
    } catch (error) {
      setError('Failed to delete story');
    }
  };

  // Render the stories
  return (
    <div>
      <h1>Stories</h1>

      {/* Display error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Add a new story */}
      <div>
        <textarea
          value={newStory}
          onChange={(e) => setNewStory(e.target.value)}
          placeholder="Write your story..."
          rows="4"
          cols="50"
        />
        <button onClick={handleAddStory}>Add Story</button>
      </div>

      {/* List of stories */}
      <div>
        {stories.length === 0 ? (
          <p>No stories available</p>
        ) : (
          stories.map(story => (
            <div key={story.id} style={{ marginBottom: '20px' }}>
              <p>{story.content}</p>
              <button onClick={() => handleDeleteStory(story.id)}>Delete Story</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Stories;
