import API from './api'; // Assuming you have an axios instance

// Create a new story
export const createStory = async (storyData) => {
  try {
    const response = await API.post('/stories', storyData); // POST request to create a story
    return response.data;
  } catch (error) {
    console.error('Error creating story:', error);
    throw error;
  }
};

// Get all stories
export const getAllStories = async () => {
  try {
    const response = await API.get('/stories'); // GET request to fetch all stories
    return response.data;
  } catch (error) {
    console.error('Error fetching stories:', error);
    throw error;
  }
};

// Get a specific story by storyId
export const getStoryById = async (storyId) => {
  try {
    const response = await API.get(`/stories/${storyId}`); // GET request to fetch story by ID
    return response.data;
  } catch (error) {
    console.error('Error fetching story by ID:', error);
    throw error;
  }
};

// Delete a story
export const deleteStory = async (storyId) => {
  try {
    const response = await API.delete(`/stories/${storyId}`); // DELETE request to delete a story by ID
    return response.data;
  } catch (error) {
    console.error('Error deleting story:', error);
    throw error;
  }
};
