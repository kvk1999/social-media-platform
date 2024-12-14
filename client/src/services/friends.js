import axios from "../utils/api";

export const fetchFriends = () => axios.get("/friends");

export const sendFriendRequest = (userId) =>
  axios.post(`/friends/${userId}/request`);

export const acceptFriendRequest = (requestId) =>
  axios.put(`/friends/requests/${requestId}/accept`);

export const declineFriendRequest = (requestId) =>
  axios.delete(`/friends/requests/${requestId}`);
