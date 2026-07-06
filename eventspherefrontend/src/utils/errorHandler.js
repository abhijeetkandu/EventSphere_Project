export const getErrorMessage = (error, fallback = 'Something went wrong. Please try again.') => {
  if (!error) return fallback;

  const data = error.response?.data;

  if (typeof data === 'string' && data.trim()) {
    return data;
  }

  if (data?.message) {
    return data.message;
  }

  if (data?.error) {
    return typeof data.error === 'string' ? data.error : data.error.message || fallback;
  }

  if (Array.isArray(data?.errors) && data.errors.length > 0) {
    return data.errors.map((e) => e.message || e.defaultMessage || e).join(', ');
  }

  if (error.message === 'Network Error') {
    return 'Unable to reach the server. Check your connection and try again.';
  }

  if (error.response?.status === 401) {
    return 'Invalid email or password.';
  }

  if (error.response?.status === 403) {
    return 'You do not have permission to perform this action.';
  }

  if (error.response?.status === 409) {
    return 'An account with this email already exists.';
  }

  return fallback;
};
