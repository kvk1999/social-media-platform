import axios from 'axios';

// define the base url
const baseURL = '/api/v1';

const API = axios.create({
  baseURL: '/api', // Replace with your actual base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor (optional, e.g., for adding tokens)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
