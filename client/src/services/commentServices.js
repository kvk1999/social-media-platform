import axios from "../utils/api";

export const fetchComments = (postId) =>
  axios.get(`/posts/${postId}/comments`);

export const addComment = (postId, commentData) =>
  axios.post(`/posts/${postId}/comments`, commentData);

export const deleteComment = (commentId) =>
  axios.delete(`/comments/${commentId}`);

export const updateComment = (commentId, updatedData) =>
  axios.put(`/comments/${commentId}`, updatedData);
