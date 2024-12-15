// src/services/storyService.js
import api from './api';  // Importing the api instance to interact with the backend

// Function to create a new story
export const createStory = async (storyData) => {
  try {
    const response = await api.post('/stories', storyData);  // API endpoint to create a story
    return response.data;  // Return the created story data
  } catch (error) {
    console.error('Error creating story:', error);
    throw error;  // Rethrow or handle error as needed
  }
};

// Function to fetch all stories
export const getAllStories = async () => {
  try {
    const response = await api.get('/stories');  // API endpoint to fetch all stories
    return response.data;  // Return the list of stories
  } catch (error) {
    console.error('Error fetching all stories:', error);
    throw error;
  }
};

// Function to fetch a specific story by its ID
export const getStoryById = async (id) => {
  try {
    const response = await api.get(`/stories/${id}`);  // API endpoint to fetch a story by ID
    return response.data;  // Return the fetched story data
  } catch (error) {
    console.error('Error fetching story by ID:', error);
    throw error;
  }
};

// Function to delete a story by its ID
export const deleteStory = async (id) => {
  try {
    const response = await api.delete(`/stories/${id}`);  // API endpoint to delete a story by ID
    return response.data;  // Return the response data after deletion
  } catch (error) {
    console.error('Error deleting story:', error);
    throw error;
  }
};

// Export the functions as a default export
const storyService = {
  createStory,
  getAllStories,
  getStoryById,
  deleteStory,
};

export default storyService;
