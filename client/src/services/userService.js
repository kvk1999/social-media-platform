import axios from 'axios';

// Create a base URL for the API
const API_URL = '/api/v1/users'; // Assuming the API endpoint is at /api/v1/users

// Function to get a user by ID
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data; // return the user data
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error; // Rethrow the error so you can handle it in the component
  }
};

// Function to get all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // return the list of users
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

// Function to update a user
export const updateUser = async (userId, updatedUserData) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}`, updatedUserData);
    return response.data; // return the updated user data
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Function to delete a user
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/${userId}`);
    return response.data; // return the response message (e.g., "User deleted successfully")
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
