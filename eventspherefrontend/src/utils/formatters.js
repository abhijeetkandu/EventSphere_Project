export const formatDate = (dateString, options = {}) => {
  if (!dateString) return 'TBA';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  });
};

export const formatTime = (timeString) => {
  if (!timeString) return '';
  if (timeString.includes('T')) {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  }
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(Number(hours), Number(minutes));
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};

export const formatPrice = (price, currency = 'USD') => {
  if (price === 0 || price === '0') return 'Free';
  if (price == null || price === '') return 'TBA';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(price));
};

export const formatCompactNumber = (num) => {
  if (num == null) return '0';
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M+`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K+`;
  return String(num);
};

export const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;

  const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
  const serverBase = apiBase.replace(/\/api\/?$/, '');
  return `${serverBase}${path.startsWith('/') ? path : `/${path}`}`;
};
