const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_URL}/api/auth/register`,
    LOGIN: `${API_URL}/api/auth/login`,
    GOOGLE: `${API_URL}/api/auth/google`,
    APPLE: `${API_URL}/api/auth/apple`,
    ME: `${API_URL}/api/auth/me`,
  },
  USERS: {
    PROFILE: `${API_URL}/api/users/profile`,
    UPDATE: `${API_URL}/api/users/update`,
  },
  ARTICLES: {
    LIST: `${API_URL}/api/articles`,
    DETAIL: (id: string) => `${API_URL}/api/articles/${id}`,
  },
  BLOGS: {
    LIST: `${API_URL}/api/blogs`,
    DETAIL: (id: string) => `${API_URL}/api/blogs/${id}`,
  },
  ISRO: {
    NEWS: `${API_URL}/api/isro/news`,
    MISSIONS: `${API_URL}/api/isro/missions`,
  },
}; 