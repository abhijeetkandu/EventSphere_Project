import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const normalizeUser = (data = {}) => ({
  id: data.id ?? data.userId ?? null,
  name: data.name ?? data.fullName ?? data.username ?? 'User',
  username: data.username ?? data.email?.split('@')[0] ?? '',
  email: data.email ?? '',
  role: typeof data.role === 'string' ? data.role.toUpperCase() : 'USER',
  avatar: data.avatar ?? data.profileImage ?? null,
});

export const normalizeAuthResponse = (data) => {
  // Backend returns { token, user } — also support legacy plain-string JWT
  if (typeof data === 'string' && data.trim()) {
    return { token: data.trim(), user: null };
  }

  const token =
    data?.token ??
    data?.accessToken ??
    data?.jwt ??
    data?.data?.token ??
    data?.data?.accessToken;

  const userPayload = data?.user ?? data?.data?.user ?? null;

  return {
    token,
    user: userPayload ? normalizeUser(userPayload) : null,
  };
};

export const authService = {
  login: async (credentials) => {
    const payload = {
      email: credentials.email?.trim(),
      password: credentials.password,
    };

    const { data } = await api.post(API_ENDPOINTS.AUTH.LOGIN, payload);
    const result = normalizeAuthResponse(data);

    if (!result.token) {
      throw new Error('Invalid login response from server');
    }

    return result;
  },

  register: async (userData) => {
    const payload = {
      name: userData.name?.trim(),
      email: userData.email?.trim(),
      password: userData.password,
    };

    const { data } = await api.post(API_ENDPOINTS.AUTH.REGISTER, payload);
    return normalizeAuthResponse(data);
  },

  forgotPassword: async (email) => {
    const { data } = await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
      email: email.trim(),
    });
    return data;
  },

  getCurrentUser: async () => {
    const { data } = await api.get(API_ENDPOINTS.AUTH.ME);
    return normalizeUser(data?.user ?? data);
  },
};
