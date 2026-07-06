import api from './api';
import { API_ENDPOINTS } from '../utils/constants';
import { getImageUrl } from '../utils/formatters';

const formatLocation = (event) => {
  if (event.location) return event.location;
  const parts = [event.venue, event.city].filter(Boolean);
  return parts.length ? parts.join(', ') : 'TBA';
};

export const normalizeEvent = (event = {}) => ({
  id: event.id,
  title: event.title ?? event.name ?? 'Untitled Event',
  description: event.description ?? '',
  category: event.category ?? event.eventCategory ?? 'Other',
  location: formatLocation(event),
  venue: event.venue ?? event.location ?? '',
  city: event.city ?? '',
  date: event.eventDate ?? event.date ?? event.startDate ?? null,
  startTime: event.startTime ?? null,
  endTime: event.endTime ?? null,
  price: event.ticketPrice ?? event.price ?? event.ticketPrice ?? 0,
  capacity: event.totalSeats ?? event.capacity ?? null,
  availableSeats: event.availableSeats ?? event.remainingSeats ?? null,
  bannerImage: getImageUrl(event.imageUrl ?? event.bannerImage ?? event.image ?? null),
  featured: Boolean(event.featured ?? event.isFeatured),
  status: event.status ?? 'ACTIVE',
  organizer: event.organizer ?? event.organizerName ?? null,
  rating: event.rating ?? event.averageRating ?? null,
});

const parseSortParams = (params = {}) => {
  const query = { page: params.page ?? 0, size: params.size ?? 12 };

  if (params.sort?.includes(',')) {
    const [sortBy, direction] = params.sort.split(',');
    query.sortBy = sortBy;
    query.direction = direction;
  } else {
    query.sortBy = params.sortBy ?? 'eventDate';
    query.direction = params.direction ?? 'asc';
  }

  return query;
};

const normalizePageResponse = (data) => {
  const content = data?.content ?? data?.events ?? data?.data ?? (Array.isArray(data) ? data : []);
  const page = data?.number ?? data?.page ?? data?.currentPage ?? 0;
  const size = data?.size ?? data?.pageSize ?? content.length;
  const totalElements = data?.totalElements ?? data?.total ?? content.length;
  const totalPages = data?.totalPages ?? Math.ceil(totalElements / (size || 1));

  return {
    events: content.map(normalizeEvent),
    page,
    size,
    totalElements,
    totalPages,
  };
};

export const eventService = {
  getEvents: async (params = {}) => {
    const { data } = await api.get(API_ENDPOINTS.EVENTS, { params: parseSortParams(params) });
    return normalizePageResponse(data);
  },

  searchEvents: async (params = {}) => {
    const searchParams = {
      city: params.city ?? params.search,
      category: params.category && params.category !== 'all' ? params.category : undefined,
    };
    const { data } = await api.get(`${API_ENDPOINTS.EVENTS}/search`, { params: searchParams });
    const events = Array.isArray(data) ? data : data?.content ?? [];
    return {
      events: events.map(normalizeEvent),
      page: 0,
      size: events.length,
      totalElements: events.length,
      totalPages: 1,
    };
  },

  getFeaturedEvents: async (limit = 6) => {
    try {
      const { data } = await api.get(`${API_ENDPOINTS.EVENTS}/featured`, {
        params: { limit },
      });
      const events = Array.isArray(data) ? data : data?.content ?? data?.events ?? [];
      return events.map(normalizeEvent);
    } catch {
      const result = await eventService.getEvents({ page: 0, size: limit, sort: 'eventDate,desc' });
      return result.events.slice(0, limit);
    }
  },

  getEventById: async (id) => {
    const { data } = await api.get(`${API_ENDPOINTS.EVENTS}/${id}`);
    return normalizeEvent(data?.event ?? data);
  },

  getCategories: async () => {
    try {
      const { data } = await api.get(`${API_ENDPOINTS.EVENTS}/categories`);
      return Array.isArray(data) ? data : data?.categories ?? [];
    } catch {
      return null;
    }
  },

  createEvent: async (eventData) => {
    const payload = buildEventPayload(eventData);
    const { data } = await api.post(API_ENDPOINTS.EVENTS, payload);
    return normalizeEvent(data?.event ?? data);
  },

  updateEvent: async (id, eventData) => {
    const payload = buildEventPayload(eventData);
    const { data } = await api.put(`${API_ENDPOINTS.EVENTS}/${id}`, payload);
    return normalizeEvent(data?.event ?? data);
  },

  deleteEvent: async (id) => {
    const { data } = await api.delete(`${API_ENDPOINTS.EVENTS}/${id}`);
    return data;
  },

  uploadBanner: async (id, file) => {
    const imageUrl = await readFileAsDataUrl(file);
    const { data } = await api.put(`${API_ENDPOINTS.EVENTS}/${id}`, { imageUrl });
    return normalizeEvent(data?.event ?? data);
  },
};

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const buildEventPayload = (eventData) => {
  const location = eventData.location?.trim() || '';
  const [venuePart, cityPart] = location.includes(',')
    ? location.split(',').map((part) => part.trim())
    : [location, location];

  return {
    title: eventData.title?.trim(),
    description: eventData.description?.trim(),
    category: eventData.category,
    venue: eventData.venue?.trim() || venuePart || 'TBA',
    city: eventData.city?.trim() || cityPart || venuePart || 'TBA',
    eventDate: eventData.date,
    ticketPrice: Number(eventData.price),
    totalSeats: Number(eventData.capacity),
    availableSeats: Number(eventData.availableSeats ?? eventData.capacity),
    imageUrl: eventData.imageUrl || null,
  };
};
