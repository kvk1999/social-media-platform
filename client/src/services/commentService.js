import API from './api';

export const fetchCommentsByPost = async (postId) => {
  const response = await API.get(`/posts/${postId}/comments`);
  return response.data;
};

export const addComment = async (postId, commentData) => {
  const response = await API.post(`/posts/${postId}/comments`, commentData);
  return response.data;
};

export const updateComment = async (commentId, updatedData) => {
  const response = await API.put(`/comments/${commentId}`, updatedData);
  return response.data;
};

export const deleteComment = async (commentId) => {
  const response = await API.delete(`/comments/${commentId}`);
  return response.data;
};
