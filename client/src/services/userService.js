import API from './api';

export const fetchUserProfile = async (userId) => {
  const response = await API.get(`/users/${userId}`);
  return response.data;
};

export const updateUserProfile = async (userId, updatedData) => {
  const response = await API.put(`/users/${userId}`, updatedData);
  return response.data;
};

export const deleteUserProfile = async (userId) => {
  const response = await API.delete(`/users/${userId}`);
  return response.data;
};