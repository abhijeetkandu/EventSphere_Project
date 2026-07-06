export const APP_NAME = 'EventSphere';
export const APP_TAGLINE = 'Discover. Book. Experience.';

export const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',

  EVENTS: '/events',
  EVENT_DETAILS: '/events/:id',

  DASHBOARD: '/dashboard',
  MY_TICKETS: '/dashboard/tickets',
  MY_BOOKINGS: '/dashboard/bookings',
  BOOKING_DETAILS: '/dashboard/bookings/:id',
  PROFILE: '/dashboard/profile',
  SETTINGS: '/dashboard/settings',

  ADMIN: '/admin',
  ADMIN_EVENTS: '/admin/events',
  ADMIN_USERS: '/admin/users',
  ADMIN_BOOKINGS: '/admin/bookings',

  ACCESS_DENIED: '/access-denied',
  NOT_FOUND: '*',
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    ME: '/auth/me',
  },
  EVENTS: '/events',
  BOOKINGS: {
    BASE: '/bookings',
    MY: '/bookings/my',
    UPCOMING: '/bookings/my/upcoming',
  },
  USERS: {
    BASE: '/users',
    ME: '/users/me',
    CHANGE_PASSWORD: '/users/change-password',
  },
  ADMIN: {
    BASE: '/admin',
    DASHBOARD: '/admin/dashboard',
    STATS: '/admin/dashboard',
    ANALYTICS: '/admin/dashboard',
    USERS: '/users',
    BOOKINGS: '/admin/bookings',
    EVENTS: '/events',
  },
};

export const EVENT_STATUS = {
  ACTIVE: { label: 'Active', color: 'success' },
  DRAFT: { label: 'Draft', color: 'default' },
  CANCELLED: { label: 'Cancelled', color: 'error' },
  COMPLETED: { label: 'Completed', color: 'info' },
};

export const BOOKING_STATUS = {
  CONFIRMED: { label: 'Confirmed', color: 'success' },
  PENDING: { label: 'Pending', color: 'warning' },
  CANCELLED: { label: 'Cancelled', color: 'error' },
  COMPLETED: { label: 'Completed', color: 'info' },
};

export const EVENT_CATEGORIES = [
  { id: 'all', label: 'All Events', icon: '✨' },
  { id: 'Music', label: 'Music', icon: '🎵' },
  { id: 'Technology', label: 'Technology', icon: '💻' },
  { id: 'Business', label: 'Business', icon: '💼' },
  { id: 'Arts', label: 'Arts & Culture', icon: '🎨' },
  { id: 'Sports', label: 'Sports', icon: '⚽' },
  { id: 'Food', label: 'Food & Drink', icon: '🍽️' },
  { id: 'Education', label: 'Education', icon: '📚' },
];

export const SORT_OPTIONS = [
  { value: 'eventDate,asc', label: 'Date: Soonest' },
  { value: 'eventDate,desc', label: 'Date: Latest' },
  { value: 'price,asc', label: 'Price: Low to High' },
  { value: 'price,desc', label: 'Price: High to Low' },
  { value: 'title,asc', label: 'Name: A–Z' },
];

export const LANDING_STATS = [
  { label: 'Events Hosted', value: '2,500+', suffix: '' },
  { label: 'Happy Attendees', value: '50', suffix: 'K+' },
  { label: 'Cities Worldwide', value: '120+', suffix: '' },
  { label: 'Average Rating', value: '4.9', suffix: '★' },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Product Designer',
    avatar: 'SC',
    quote: 'EventSphere completely changed how I discover events. The booking flow is seamless and the UI is gorgeous.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'Startup Founder',
    avatar: 'MJ',
    quote: 'We hosted our launch event through EventSphere. Ticket management and attendee tracking were effortless.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Music Enthusiast',
    avatar: 'ER',
    quote: 'I\'ve booked over 20 concerts here. Search filters are spot-on and I never miss a show in my city.',
    rating: 5,
  },
];
