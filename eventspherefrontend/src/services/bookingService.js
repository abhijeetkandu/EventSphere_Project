import api from './api';
import { API_ENDPOINTS } from '../utils/constants';
import { getImageUrl } from '../utils/formatters';

const normalizeStatus = (status) => {
  if (!status) return 'CONFIRMED';
  const upper = String(status).toUpperCase();
  return upper === 'BOOKED' ? 'CONFIRMED' : upper;
};

export const normalizeBooking = (booking = {}) => ({
  id: booking.id,
  eventId: booking.eventId ?? booking.event?.id,
  eventTitle: booking.eventTitle ?? booking.event?.title ?? booking.title ?? 'Event',
  eventDate: booking.eventDate ?? booking.event?.eventDate ?? booking.event?.date ?? null,
  startTime: booking.startTime ?? booking.event?.startTime ?? null,
  location: booking.location ?? booking.event?.venue ?? booking.event?.city ?? 'TBA',
  tickets: booking.numberOfTickets ?? booking.tickets ?? booking.quantity ?? 1,
  totalPrice: booking.totalAmount ?? booking.totalPrice ?? 0,
  status: normalizeStatus(booking.status ?? booking.bookingStatus),
  bookingDate: booking.bookingDate ?? booking.createdAt ?? booking.created_at ?? null,
  ticketCode: booking.ticketCode ?? booking.bookingCode ?? booking.reference ?? `TKT-${booking.id}`,
  notes: booking.notes ?? '',
  userName: booking.userName ?? booking.user?.name ?? null,
  userEmail: booking.userEmail ?? booking.user?.email ?? null,
  bannerImage: getImageUrl(
    booking.bannerImage ?? booking.event?.imageUrl ?? booking.event?.bannerImage ?? null,
  ),
});

export const isUpcomingBooking = (booking) => {
  if (booking.status?.toUpperCase() === 'CANCELLED') return false;
  if (!booking.eventDate) return true;
  return new Date(booking.eventDate) >= new Date();
};

export const isPastBooking = (booking) => !isUpcomingBooking(booking);

const normalizeListResponse = (data) => {
  const content = Array.isArray(data) ? data : data?.content ?? data?.bookings ?? data?.data ?? [];
  return {
    bookings: content.map(normalizeBooking),
    totalElements: data?.totalElements ?? content.length,
    totalPages: data?.totalPages ?? 1,
    page: data?.number ?? 0,
  };
};

export const bookingService = {
  bookTicket: async ({ eventId, tickets = 1 }) => {
    const { data } = await api.post(
      `${API_ENDPOINTS.BOOKINGS.BASE}/${Number(eventId)}/${Number(tickets)}`,
    );
    return normalizeBooking(data);
  },

  getMyBookings: async () => {
    const { data } = await api.get(API_ENDPOINTS.BOOKINGS.MY);
    return normalizeListResponse(data);
  },

  getUpcomingBookings: async (limit = 5) => {
    const result = await bookingService.getMyBookings();
    const now = new Date();
    return result.bookings
      .filter((b) => !b.eventDate || new Date(b.eventDate) >= now)
      .filter((b) => b.status !== 'CANCELLED')
      .slice(0, limit);
  },

  getBookingById: async (id) => {
    const { data } = await api.get(`${API_ENDPOINTS.BOOKINGS.BASE}/${id}`);
    return normalizeBooking(data?.booking ?? data);
  },

  cancelBooking: async (id) => {
    await api.put(`${API_ENDPOINTS.BOOKINGS.BASE}/cancel/${id}`);
    return { id, status: 'CANCELLED' };
  },
};
