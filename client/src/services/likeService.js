import API from './api';

export const toggleLikePost = async (postId) => {
  const response = await API.post(`/posts/${postId}`, likePost);
  return response.data;
};

export const toggleLikeComment = async (commentId) => {
  const response = await API.post(`/comments/${commentId}`, likeComment);
  return response.data;
};

export const toggleUnlikeComment = async (commentId) => {
  const response = await API.delete(`/comments/${commentId}`, unlikeComment);
  return response.data;
}

export const toggleUlikePost = async (postId) => {
    const response = await API.delete(`/posts/${postId}`, unlikePost);
    return response.data;
  };