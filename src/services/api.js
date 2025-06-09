import axios from 'axios';
import { auth } from '../firebase';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});



// Add auth token to requests
api.interceptors.request.use(
  async (config) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
      error.message = 'Request timeout. Please try again.';
    } else if (!error.response) {
      console.error('Network error:', error.message);
      error.message = 'Network error. Please check your connection.';
    } else if (error.response.status === 401) {
      console.error('Authentication error');
      // Optionally redirect to login
    } else if (error.response.status >= 500) {
      console.error('Server error:', error.response.data);
      error.message = 'Server error. Please try again later.';
    }
    return Promise.reject(error);
  }
);


// Flashcard API functions
export const flashcardAPI = {
  create: (data) => api.post('/flashcards/create', data),
  getUserSets: (userId) => api.get(`/flashcards/user/${userId}`),
  getSet: (setId) => api.get(`/flashcards/${setId}`),
  getFlashcardSet: (setId) => api.get(`/flashcards/${setId}`),
  update: (setId, data) => api.put(`/flashcards/${setId}`, data),
  delete: (setId) => api.delete(`/flashcards/${setId}`)
};

// Auth API functions
export const authAPI = {
  login: (idToken) => api.post('/auth/login', { idToken })
};

export default api;
