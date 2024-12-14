import API from './api'; // Assuming API.js contains the axios instance

// Like a post
export const likePost = async (postId) => {
  try {
    const response = await API.post(`/likes/${postId}`);
    return response.data; // Return the updated post with the like information
  } catch (error) {
    console.error('Error liking post:', error);
    throw error;
  }
};

// Unlike a post
export const unlikePost = async (postId) => {
  try {
    const response = await API.delete(`/likes/${postId}`);
    return response.data; // Return the updated post with the like removed
  } catch (error) {
    console.error('Error unliking post:', error);
    throw error;
  }
};

// Like a comment
export const likeComment = async (commentId) => {
  try {
    const response = await API.post(`/likes/comment/${commentId}`);
    return response.data; // Return the updated comment with the like information
  } catch (error) {
    console.error('Error liking comment:', error);
    throw error;
  }
};

// Unlike a comment
export const unlikeComment = async (commentId) => {
  try {
    const response = await API.delete(`/likes/comment/${commentId}`);
    return response.data; // Return the updated comment with the like removed
  } catch (error) {
    console.error('Error unliking comment:', error);
    throw error;
  }
};
