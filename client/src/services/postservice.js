import API from './api';

export const fetchPosts = async () => {
  const response = await API.get('/posts');
  return response.data;
};

export const fetchPostById = async (postId) => {
  const response = await API.get(`/posts/${postId}`);
  return response.data;
};

export const createPost = async (postData) => {
  const response = await API.post('/posts', postData);
  return response.data;
};

export const updatePost = async (postId, updatedData) => {
  const response = await API.put(`/posts/${postId}`, updatedData);
  return response.data;
};

export const deletePost = async (postId) => {
  const response = await API.delete(`/posts/${postId}`);
  return response.data;
};
