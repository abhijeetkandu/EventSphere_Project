import api from './api';
import { API_ENDPOINTS } from '../utils/constants';
import { normalizeUser } from './authService';
import { normalizeBooking } from './bookingService';
import { normalizeEvent } from './eventService';

const normalizeStats = (data = {}) => ({
  totalEvents: data.totalEvents ?? data.events ?? data.eventCount ?? 0,
  totalUsers: data.totalUsers ?? data.users ?? data.userCount ?? 0,
  totalBookings: data.totalBookings ?? data.bookings ?? data.bookingCount ?? 0,
  totalRevenue: data.totalRevenue ?? data.revenue ?? 0,
  availableTickets: data.availableTickets ?? 0,
  monthlyRevenue: data.monthlyRevenue ?? data.revenueByMonth ?? [],
  bookingsByMonth: data.bookingsByMonth ?? data.bookingTrend ?? [],
  recentBookings: (data.recentBookings ?? []).map(normalizeBooking),
  topEvents: (data.topEvents ?? []).map(normalizeEvent),
});

const normalizeList = (data, mapper) => {
  const content = Array.isArray(data) ? data : data?.content ?? data?.data ?? [];
  return {
    items: content.map(mapper),
    totalElements: data?.totalElements ?? content.length,
    totalPages: data?.totalPages ?? 1,
    page: data?.number ?? 0,
  };
};

export const adminService = {
  getStats: async () => {
    const { data } = await api.get(API_ENDPOINTS.ADMIN.DASHBOARD);
    return normalizeStats(data);
  },

  getAnalytics: async () => {
    return adminService.getStats();
  },

  getUsers: async () => {
    const { data } = await api.get(API_ENDPOINTS.USERS.BASE);
    return normalizeList(data, normalizeUser);
  },

  getAllBookings: async () => {
    const { data } = await api.get(API_ENDPOINTS.ADMIN.BOOKINGS);
    return normalizeList(data, normalizeBooking);
  },

  deleteUser: async (id) => {
    const { data } = await api.delete(`${API_ENDPOINTS.USERS.BASE}/${id}`);
    return data;
  },
};
