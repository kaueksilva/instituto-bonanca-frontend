import api from './api';
import { AdminUser, ApiResponse, CreateUserData, Pagination, UpdateUserData } from '../types/admin';

export const userService = {
  async list(page = 1, limit = 10, search = '') {
    const { data } = await api.get<ApiResponse<AdminUser[]>>('/users', {
      params: { page, limit, search },
    });
    return {
      users: data.data,
      pagination: data.pagination as Pagination,
    };
  },

  async getById(id: number) {
    const { data } = await api.get<ApiResponse<AdminUser>>(`/users/${id}`);
    return data.data;
  },

  async create(userData: CreateUserData) {
    const { data } = await api.post<ApiResponse<AdminUser>>('/users', userData);
    return data.data;
  },

  async update(id: number, userData: UpdateUserData) {
    const { data } = await api.put<ApiResponse<AdminUser>>(`/users/${id}`, userData);
    return data.data;
  },

  async delete(id: number) {
    const { data } = await api.delete<ApiResponse<null>>(`/users/${id}`);
    return data;
  },
};
