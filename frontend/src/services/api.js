import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5001/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to handle user registration
export const register = (userData) => {
    return apiClient.post('/users/register', userData);
};

// Function to handle user login
export const login = (credentials) => {
    return apiClient.post('/users/login', credentials);
};