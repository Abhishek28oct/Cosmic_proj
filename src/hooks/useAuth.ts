import { useState, useEffect } from 'react';
import { User } from '../types';
import api from '../utils/api';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      const response = await api.post('/api/auth/signup', { username, email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const googleLogin = async (credential: string) => {
    try {
      const response = await api.post('/api/auth/google', { credential });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    loading,
    login,
    signup,
    logout,
    googleLogin,
    isAuthenticated: !!user,
  };
}; 