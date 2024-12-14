// services/postService.js
import API from './api'; // Assuming you have an axios instance

// Fetch all posts
export const fetchPosts = async () => {
  try {
    const response = await API.get('/posts');
    return response.data; // Returns the list of posts
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error; // Propagate error to be handled in the component
  }
};

// Create a new post
export const createPost = async (postData) => {
  try {
    const response = await API.post('/posts', postData);
    return response.data; // Returns the created post
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Delete a post by its ID
export const deletePost = async (postId) => {
  try {
    const response = await API.delete(`/posts/${postId}`);
    return response.data; // Returns the result of the deletion (e.g., success message)
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};
