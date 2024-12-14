import API from './api'; // Assuming you have your axios instance set up in 'api.js'

// Send a friend request to another user
export const sendFriendRequest = async (userId) => {
  try {
    const response = await API.post(`/friends/${userId}`);
    return response.data; // Returns the response data (success message or updated status)
  } catch (error) {
    console.error('Error sending friend request:', error);
    throw error; // Throw error to be handled in the component
  }
};

// Accept a pending friend request
export const acceptFriendRequest = async (userId) => {
  try {
    const response = await API.put(`/friends/${userId}`);
    return response.data; // Returns the response data (success message or updated status)
  } catch (error) {
    console.error('Error accepting friend request:', error);
    throw error; // Throw error to be handled in the component
  }
};

// Decline a pending friend request
export const declineFriendRequest = async (userId) => {
  try {
    const response = await API.put(`/friends/${userId}/decline`);
    return response.data; // Returns the response data (success message or updated status)
  } catch (error) {
    console.error('Error declining friend request:', error);
    throw error; // Throw error to be handled in the component
  }
};

// Remove a friend
export const removeFriend = async (userId) => {
  try {
    const response = await API.delete(`/friends/${userId}`);
    return response.data; // Returns the response data (success message or updated status)
  } catch (error) {
    console.error('Error removing friend:', error);
    throw error; // Throw error to be handled in the component
  }
};

// Get all incoming friend requests
export const getFriendRequests = async () => {
  try {
    const response = await API.get('/friends/requests');
    return response.data; // Returns the list of incoming friend requests
  } catch (error) {
    console.error('Error fetching friend requests:', error);
    throw error; // Throw error to be handled in the component
  }
};

// Get the list of all friends
export const getFriends = async () => {
  try {
    const response = await API.get('/friends');
    return response.data; // Returns the list of all friends
  } catch (error) {
    console.error('Error fetching friends:', error);
    throw error; // Throw error to be handled in the component
  }
};
