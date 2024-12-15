import api from "./api";

const getUserInfo = async () => {
    return await api.get("/users/me");
};

const getUserById = async (userId) => {
    return await api.get(`/users/${userId}`);
};

const updateUser = async (userId, data) => {
    return await api.put(`/users/${userId}`, data);
};

const changePassword = async (userId, data) => {
    return await api.put(`/users/${userId}/password`, data);
};

const uploadProfilePicture = async (userId, formData) => {
    return await api.post(`/users/${userId}/profile-picture`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

const getUsersList = async () => {
    return await api.get("/users");
};

// Add deleteUser if needed:
const deleteUser = async (userId) => {
    return await api.delete(`/users/${userId}`);
};

// Export the individual functions
export { getUserInfo, getUserById, updateUser, deleteUser };
