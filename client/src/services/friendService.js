import API from './api';

export const fetchFriendRequests = async () => {
  const response = await API.get('/friends/requests');
  return response.data;
};

export const sendFriendRequest = async (userId) => {
  const response = await API.post(`/friends/${userId}/request`);
  return response.data;
};

export const respondToFriendRequest = async (requestId, status) => {
  const response = await API.put(`/friends/requests/${requestId}`, { status });
  return response.data;
};

export const acceptFriendRequest = async (requestId) => {
  const response = await API.put(`/friends/requests/${requestId}/accept`);
  return response.data;
};

export const rejectFriendRequest = async (requestId) => {
  const response = await API.delete(`/friends/requests/${requestId}`);
  return response.data;
};

export const getFriends = async () => {
  const response = await API.get('/friends');
  return response.data;
};

export const removefriend = async (friendId) => {
  const response = await API.delete(`/friends/${friendId}`);
  return response.data;
};