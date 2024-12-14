import axios from "../utils/api";

export const fetchPosts = () => axios.get("/posts");

export const createPost = (postData) => axios.post("/posts", postData);

export const deletePost = (postId) => axios.delete(`/posts/${postId}`);

export const updatePost = (postId, updatedData) =>
  axios.put(`/posts/${postId}`, updatedData);
