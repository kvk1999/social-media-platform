import API from './api'; // Assuming you have your axios instance set up in 'api.js'

// Fetch comments for a specific post
export const fetchCommentsByPost = async (postId) => {
  try {
    const response = await API.get(`/posts/${postId}/comments`);
    return response.data; // Returns the list of comments for the post
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error; // Throw error to be handled in the component
  }
};

// Add a comment to a specific post
export const addComment = async (postId, commentData) => {
  try {
    const response = await API.post(`/posts/${postId}/comments`, commentData);
    return response.data; // Returns the created comment
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error; // Throw error to be handled in the component
  }
};

// Update an existing comment
export const updateComment = async (commentId, updatedData) => {
  try {
    const response = await API.put(`/comments/${commentId}`, updatedData);
    return response.data; // Returns the updated comment
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error; // Throw error to be handled in the component
  }
};

// Delete a comment by its ID
export const deleteComment = async (commentId) => {
  try {
    const response = await API.delete(`/comments/${commentId}`);
    return response.data; // Returns a success message or status
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error; // Throw error to be handled in the component
  }
};
