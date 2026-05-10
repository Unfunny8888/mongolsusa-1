// src/services/api/queryClient.js
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

// ============================================================================

// src/services/api/axiosClient.js
import axios from 'axios';

const API_BASE_URL = process.env.VITE_API_URL || 'https://api.mongolsusa.com';

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle errors
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth and redirect to login
      localStorage.removeItem('auth_token');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// ============================================================================

// src/services/api/contentApi.js
import { axiosClient } from './axiosClient';

export const contentApi = {
  /**
   * Get feed content with ranking
   */
  getFeed: async (params = {}) => {
    const response = await axiosClient.get('/api/feed', { params });
    return response.data;
  },

  /**
   * Get single content by ID
   */
  getContent: async (contentId) => {
    const response = await axiosClient.get(`/api/content/${contentId}`);
    return response.data;
  },

  /**
   * Create new content
   */
  createContent: async (data) => {
    const response = await axiosClient.post('/api/content', data);
    return response.data;
  },

  /**
   * Update content
   */
  updateContent: async (contentId, data) => {
    const response = await axiosClient.put(`/api/content/${contentId}`, data);
    return response.data;
  },

  /**
   * Delete content
   */
  deleteContent: async (contentId) => {
    const response = await axiosClient.delete(`/api/content/${contentId}`);
    return response.data;
  },

  /**
   * Like/unlike content
   */
  toggleLike: async (contentId) => {
    const response = await axiosClient.post(`/api/content/${contentId}/like`);
    return response.data;
  },

  /**
   * Save/unsave content
   */
  toggleSave: async (contentId) => {
    const response = await axiosClient.post(`/api/content/${contentId}/save`);
    return response.data;
  },

  /**
   * Get content by type/category
   */
  getContentByCategory: async (category, params = {}) => {
    const response = await axiosClient.get(`/api/content/category/${category}`, {
      params,
    });
    return response.data;
  },

  /**
   * Search content
   */
  search: async (query, params = {}) => {
    const response = await axiosClient.get('/api/search', {
      params: { q: query, ...params },
    });
    return response.data;
  },

  /**
   * Get trending content
   */
  getTrending: async (params = {}) => {
    const response = await axiosClient.get('/api/content/trending', { params });
    return response.data;
  },
};

// ============================================================================

// src/services/api/userApi.js
export const userApi = {
  /**
   * Get user profile
   */
  getProfile: async (userId) => {
    const response = await axiosClient.get(`/api/users/${userId}`);
    return response.data;
  },

  /**
   * Update user profile
   */
  updateProfile: async (data) => {
    const response = await axiosClient.put('/api/users/profile', data);
    return response.data;
  },

  /**
   * Get user's listings
   */
  getUserListings: async (userId, params = {}) => {
    const response = await axiosClient.get(`/api/users/${userId}/listings`, {
      params,
    });
    return response.data;
  },

  /**
   * Get user reputation
   */
  getReputation: async (userId) => {
    const response = await axiosClient.get(`/api/users/${userId}/reputation`);
    return response.data;
  },

  /**
   * Follow user
   */
  followUser: async (userId) => {
    const response = await axiosClient.post(`/api/users/${userId}/follow`);
    return response.data;
  },

  /**
   * Get saved items
   */
  getSavedItems: async (params = {}) => {
    const response = await axiosClient.get('/api/users/saved', { params });
    return response.data;
  },
};

// ============================================================================

// src/services/api/messagingApi.js
export const messagingApi = {
  /**
   * Get all conversations
   */
  getConversations: async (params = {}) => {
    const response = await axiosClient.get('/api/conversations', { params });
    return response.data;
  },

  /**
   * Get conversation details
   */
  getConversation: async (conversationId) => {
    const response = await axiosClient.get(
      `/api/conversations/${conversationId}`
    );
    return response.data;
  },

  /**
   * Get messages in conversation
   */
  getMessages: async (conversationId, params = {}) => {
    const response = await axiosClient.get(
      `/api/conversations/${conversationId}/messages`,
      { params }
    );
    return response.data;
  },

  /**
   * Send message
   */
  sendMessage: async (conversationId, data) => {
    const response = await axiosClient.post(
      `/api/conversations/${conversationId}/messages`,
      data
    );
    return response.data;
  },

  /**
   * Start new conversation
   */
  startConversation: async (participantId) => {
    const response = await axiosClient.post('/api/conversations', {
      participantId,
    });
    return response.data;
  },

  /**
   * Mark messages as read
   */
  markAsRead: async (conversationId) => {
    const response = await axiosClient.put(
      `/api/conversations/${conversationId}/read`
    );
    return response.data;
  },
};

// ============================================================================

// src/services/api/authApi.js
export const authApi = {
  /**
   * Sign up
   */
  signup: async (email, password, name) => {
    const response = await axiosClient.post('/api/auth/signup', {
      email,
      password,
      name,
    });
    return response.data;
  },

  /**
   * Login
   */
  login: async (email, password) => {
    const response = await axiosClient.post('/api/auth/login', {
      email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  },

  /**
   * Logout
   */
  logout: async () => {
    localStorage.removeItem('auth_token');
    return await axiosClient.post('/api/auth/logout');
  },

  /**
   * Get current user
   */
  getCurrentUser: async () => {
    const response = await axiosClient.get('/api/auth/me');
    return response.data;
  },

  /**
   * Refresh token
   */
  refreshToken: async () => {
    const response = await axiosClient.post('/api/auth/refresh');
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  },

  /**
   * Verify email
   */
  verifyEmail: async (code) => {
    const response = await axiosClient.post('/api/auth/verify-email', { code });
    return response.data;
  },
};
