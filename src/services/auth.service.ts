import api from './api';
import { ApiResponse, AuthUser, LoginCredentials } from '../types/admin';

interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    const { data } = await api.post<ApiResponse<LoginResponse>>('/auth/login', credentials);
    if (data.data.accessToken) {
      localStorage.setItem('access_token', data.data.accessToken);
    }
    return data.data;
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('access_token');
    }
  },

  async me() {
    const { data } = await api.get<ApiResponse<AuthUser>>('/auth/me');
    return data.data;
  },
};
