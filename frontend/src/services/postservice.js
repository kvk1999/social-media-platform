// Import the 'api' instance which is assumed to be set up for interacting with your backend.
import api from './api';  // Assuming the 'api.js' file exists in the same folder


// Function to fetch posts from the API
export const fetchPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;  // Assuming your API returns the data in the 'data' field
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;  // You can throw the error or handle it according to your need
  }
};

// Function to create a new post by sending the post data to the backend
export const createPost = async (postData) => {
  try {
    const response = await api.post('/posts', postData);
    return response.data;  // Return the data from the response (for example, the newly created post)
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Function to delete a post by ID
export const deletePost = async (postId) => {
  try {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;  // Return any relevant data after deletion (e.g., success status)
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

// Export the functions for use in other files (like components)
export default {
  fetchPosts,
  createPost,
  deletePost
};
