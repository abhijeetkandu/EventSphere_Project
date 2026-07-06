import axios from 'axios';
import { getToken, clearAuth } from '../utils/storage';
import { ROUTES } from '../utils/constants';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const AUTH_PATHS = ['/auth/login', '/auth/register', '/auth/forgot-password'];

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url || '';
    const isAuthRequest = AUTH_PATHS.some((path) => requestUrl.includes(path));

    if (error.response?.status === 401 && !isAuthRequest) {
      clearAuth();
      const publicPaths = [ROUTES.LOGIN, ROUTES.REGISTER, ROUTES.FORGOT_PASSWORD, ROUTES.HOME];
      const isPublicPage = publicPaths.some((path) => window.location.pathname.startsWith(path));

      if (!isPublicPage) {
        window.location.href = ROUTES.LOGIN;
      }
    }
    return Promise.reject(error);
  },
);

export default api;
