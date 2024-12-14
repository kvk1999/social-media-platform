import axios from "../utils/api";

// Fetch user profile by ID
export const fetchUserProfile = (userId) => {
  return axios
    .get(`/users/${userId}`)
    .then((response) => response.data)  // Assuming the data returned is in response.data
    .catch((error) => {
      console.error("Error fetching user profile:", error);
      throw error;  // Propagate the error for further handling
    });
};

// Update user profile by ID
export const updateUserProfile = (userId, updatedData) => {
  return axios
    .put(`/users/${userId}`, updatedData)
    .then((response) => response.data)  // Assuming the updated user profile is in response.data
    .catch((error) => {
      console.error("Error updating user profile:", error);
      throw error;  // Propagate the error for further handling
    });
};

// Search users based on a query (for admin or user search functionality)
export const searchUsers = (query) => {
  return axios
    .get(`/users/search?q=${query}`)
    .then((response) => response.data)  // Assuming the search result is in response.data
    .catch((error) => {
      console.error("Error searching for users:", error);
      throw error;  // Propagate the error for further handling
    });
};
