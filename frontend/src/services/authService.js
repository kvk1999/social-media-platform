import api from "./api";

const authService = {
    register: async (data) => {
        return await api.post('/auth/register', data);
    },
    login: async (data) => {
        return await api.post('/auth/login', data);
    },
    logout: async () => {
        return await api.post('/auth/logout');
    },
    me: async () => {
        return await api.get('/auth/me');
    }
}

export default authService;