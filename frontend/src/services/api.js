import axios from 'axios';

const apiClient = axios.create({
    // Change this line for the production build
    baseURL: 'https://notenest-api-vk54.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// IMPORTANT: Add a request interceptor to include the token in all requests
apiClient.interceptors.request.use(
    (config) => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo && userInfo.token) {
            config.headers.Authorization = `Bearer ${userInfo.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// --- AUTH ---
export const register = (userData) => apiClient.post('/users/register', userData);
export const login = (credentials) => apiClient.post('/users/login', credentials);

// --- NOTES ---
export const getNotes = () => apiClient.get('/notes');
export const createNote = (noteData) => apiClient.post('/notes', noteData);
export const updateNote = (id, noteData) => apiClient.put(`/notes/${id}`, noteData);
export const deleteNote = (id) => apiClient.delete(`/notes/${id}`);