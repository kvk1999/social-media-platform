// src/services/friendService.js
import api from './api';  // Importing the API instance

// Function to fetch friend requests
export const getFriendRequests = async () => {
  try {
    const response = await api.get('/friend-requests'); // API endpoint for friend requests
    return response.data; // Assuming the response contains the friend requests in the 'data' field
  } catch (error) {
    console.error('Error fetching friend requests:', error);
    throw error;  // Rethrow or handle error as needed
  }
};

// Function to accept a friend request
export const acceptFriendRequest = async (id) => {
  try {
    const response = await api.post(`/friend-requests/accept/${id}`);  // API endpoint for accepting a friend request
    return response.data;  // Return the data after acceptance (e.g., updated status)
  } catch (error) {
    console.error('Error accepting friend request:', error);
    throw error;
  }
};

// Function to decline a friend request
export const declineFriendRequest = async (id) => {
  try {
    const response = await api.post(`/friend-requests/decline/${id}`);  // API endpoint for declining a friend request
    return response.data;  // Return the data after decline (e.g., updated status)
  } catch (error) {
    console.error('Error declining friend request:', error);
    throw error;
  }
};

// Function to remove a friend by their ID
export const removeFriend = async (id) => {
  try {
    const response = await api.delete(`/friends/${id}`);  // API endpoint to remove a friend by their ID
    return response.data;  // Return the response data after deletion
  } catch (error) {
    console.error('Error removing friend:', error);
    throw error;
  }
};

// Function to send a friend request
export const sendFriendRequest = async (id) => {
  try {
    const response = await api.post(`/friends/add/${id}`);  // API endpoint to send a friend request
    return response.data;  // Return the response data after sending the request
  } catch (error) {
    console.error('Error sending friend request:', error);
    throw error;
  }
};

// Export the functions in an object so they can be easily used in other parts of the app
export default {
  getFriendRequests,
  acceptFriendRequest,
  declineFriendRequest,
  removeFriend,
  sendFriendRequest
};
