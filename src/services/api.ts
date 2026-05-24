import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

const DEFAULT_LOCAL_API_URL = 'http://localhost:3001/api';
const DEFAULT_PROD_API_URL = 'https://backend.bonancainstituto.com.br/api';

const normalizeBaseUrl = (url: string) => url.replace(/\/$/, '');

const resolveBaseUrl = () => {
  const configuredUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (configuredUrl) {
    return normalizeBaseUrl(configuredUrl);
  }

  if (typeof window !== 'undefined') {
    const isLocalHost =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1';

    if (isLocalHost) {
      return DEFAULT_LOCAL_API_URL;
    }

    return DEFAULT_PROD_API_URL;
  }

  return process.env.NODE_ENV === 'development'
    ? DEFAULT_LOCAL_API_URL
    : DEFAULT_PROD_API_URL;
};

const BASE_URL = resolveBaseUrl();

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  withCredentials: true, // Required for httpOnly refresh token cookie
});

// ── Request interceptor: inject access token ─────────────────────
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ── Token refresh queue ──────────────────────────────────────────
let isRefreshing = false;
let pendingQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

const flushQueue = (error: unknown, token: string | null = null) => {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else if (token) resolve(token);
  });
  pendingQueue = [];
};

// ── Response interceptor: handle 401 → attempt refresh ──────────
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        }).then((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          return api(original);
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const newToken: string = data.data.accessToken;
        localStorage.setItem('access_token', newToken);
        flushQueue(null, newToken);
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch (refreshError) {
        flushQueue(refreshError, null);
        localStorage.removeItem('access_token');
        if (typeof window !== 'undefined') {
          window.location.href = '/admin/login';
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
