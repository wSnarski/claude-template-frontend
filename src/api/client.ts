import axios from 'axios';
import type { ApiError } from '../types/api.types';

const API_URL = import.meta.env.VITE_API_URL || 'https://claude-template-api.onrender.com';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth tokens (future use)
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token here when implemented
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data) {
      const apiError = error.response.data as ApiError;
      console.error('API Error:', apiError.error.message);
    }
    return Promise.reject(error);
  }
);