import api from './api';  // Import the Axios instance

// Function to get the currently logged-in user's information
const getUserInfo = async () => {
    try {
        const response = await api.get("/users/me");
        return response.data;
    } catch (error) {
        console.error("Error fetching user info:", error);
        throw error;
    }
};

// Function to get a user by their ID
const getUserById = async (userId) => {
    try {
        const response = await api.get(`/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
        throw error;
    }
};

// Function to update user information
const updateUser = async (userId, data) => {
    try {
        const response = await api.put(`/users/${userId}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error updating user with ID ${userId}:`, error);
        throw error;
    }
};

// Function to change user's password
const changePassword = async (userId, data) => {
    try {
        const response = await api.put(`/users/${userId}/password`, data);
        return response.data;
    } catch (error) {
        console.error(`Error changing password for user with ID ${userId}:`, error);
        throw error;
    }
};

// Function to upload the user's profile picture
const uploadProfilePicture = async (userId, formData) => {
    try {
        const response = await api.post(`/users/${userId}/profile-picture`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error uploading profile picture for user with ID ${userId}:`, error);
        throw error;
    }
};

// Function to get a list of all users
const getUsersList = async () => {
    try {
        const response = await api.get("/users");
        return response.data;
    } catch (error) {
        console.error("Error fetching users list:", error);
        throw error;
    }
};

// Function to delete a user by ID
const deleteUser = async (userId) => {
    try {
        const response = await api.delete(`/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting user with ID ${userId}:`, error);
        throw error;
    }
};

export { getUserInfo, getUserById, updateUser, changePassword, uploadProfilePicture, getUsersList, deleteUser };
