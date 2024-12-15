import api from './api';  // Assuming you are using an API service for HTTP requests

// Like a post
const likePost = async (postId) => {
    return await api.post(`/posts/${postId}/like`);
};

// Unlike a post
const unlikePost = async (postId) => {
    return await api.post(`/posts/${postId}/unlike`);
};

// Like a comment
const likeComment = async (commentId) => {
    return await api.post(`/comments/${commentId}/like`);
};

// Unlike a comment
const unlikeComment = async (commentId) => {
    return await api.post(`/comments/${commentId}/unlike`);
};

// Export the functions
export { likePost, unlikePost, likeComment, unlikeComment };
