import api from './api';
import { API_ENDPOINTS } from '../utils/constants';
import { normalizeUser } from './authService';

export const userService = {
  updateProfile: async (profileData) => {
    const { data } = await api.put(API_ENDPOINTS.USERS.ME, {
      name: profileData.name?.trim(),
      email: profileData.email?.trim(),
    });
    return normalizeUser(data?.user ?? data);
  },

  changePassword: async ({ currentPassword, newPassword }) => {
    const { data } = await api.post(API_ENDPOINTS.USERS.CHANGE_PASSWORD, {
      currentPassword,
      newPassword,
    });
    return data;
  },
};
