import api from './api'; // assuming you have an API service for making HTTP requests

// Fetch comments for a specific post
const fetchCommentsByPost = async (postId) => {
    return await api.get(`/posts/${postId}/comments`);
};

// Add a new comment to a post
const addComment = async (postId, commentData) => {
    return await api.post(`/posts/${postId}/comments`, commentData);
};

// Update a comment
const updateComment = async (commentId, updatedData) => {
    return await api.put(`/comments/${commentId}`, updatedData);
};

// Delete a comment
const deleteComment = async (commentId) => {
    return await api.delete(`/comments/${commentId}`);
};

// Export all functions
export { fetchCommentsByPost, addComment, updateComment, deleteComment };
