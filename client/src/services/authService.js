import axios from 'axios';

// Define the base URL for the API
const API_URL = '/api/v1/auth'; // Assuming the auth routes are under /api/v1/auth

// Function to register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; // Return the response (e.g., success message, user data)
  } catch (error) {
    console.error('Error registering user:', error);
    throw error; // Rethrow the error so it can be handled in the component
  }
};

// Function to log in an existing user
export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData);
    return response.data; // Return the response (e.g., auth token, user data)
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Function to log out the user
export const logoutUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/logout`);
    return response.data; // Return the logout message or status
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

// Optional: Function to fetch the user's profile (protected route)
export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile`, { withCredentials: true });
    return response.data; // Return user profile data
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};
