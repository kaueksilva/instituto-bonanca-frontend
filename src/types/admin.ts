export type UserRole = 'admin' | 'editor' | 'usuario';

export interface AdminUser {
  id: number;
  nome: string;
  email: string;
  cargo: UserRole;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  id: number;
  nome: string;
  email: string;
  cargo: UserRole;
  ativo: boolean;
}

export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  pagination?: Pagination;
}

export interface CreateUserData {
  nome: string;
  email: string;
  senha: string;
  cargo: UserRole;
  ativo?: boolean;
}

export interface UpdateUserData {
  nome?: string;
  email?: string;
  cargo?: UserRole;
  ativo?: boolean;
}
