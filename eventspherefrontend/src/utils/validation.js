export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validateLogin = ({ email, password }) => {
  const errors = {};

  if (!email?.trim()) {
    errors.email = 'Email or username is required';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};

export const validateRegister = ({ name, email, password, confirmPassword }) => {
  const errors = {};

  if (!name?.trim()) {
    errors.name = 'Full name is required';
  } else if (name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!email?.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(email)) {
    errors.email = 'Enter a valid email address';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    errors.password = 'Include uppercase, lowercase, and a number';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

export const validateForgotPassword = ({ email }) => {
  const errors = {};

  if (!email?.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(email)) {
    errors.email = 'Enter a valid email address';
  }

  return errors;
};

export const validateProfile = ({ name, email }) => {
  const errors = {};

  if (!name?.trim()) {
    errors.name = 'Full name is required';
  } else if (name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!email?.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(email)) {
    errors.email = 'Enter a valid email address';
  }

  return errors;
};

export const validateChangePassword = ({ currentPassword, newPassword, confirmPassword }) => {
  const errors = {};

  if (!currentPassword) {
    errors.currentPassword = 'Current password is required';
  }

  if (!newPassword) {
    errors.newPassword = 'New password is required';
  } else if (newPassword.length < 8) {
    errors.newPassword = 'Password must be at least 8 characters';
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
    errors.newPassword = 'Include uppercase, lowercase, and a number';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your new password';
  } else if (newPassword !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (currentPassword && newPassword && currentPassword === newPassword) {
    errors.newPassword = 'New password must be different from current password';
  }

  return errors;
};

export const validateEvent = ({
  title,
  description,
  category,
  location,
  date,
  price,
  capacity,
}) => {
  const errors = {};

  if (!title?.trim()) {
    errors.title = 'Event title is required';
  } else if (title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters';
  }

  if (!description?.trim()) {
    errors.description = 'Description is required';
  } else if (description.trim().length < 20) {
    errors.description = 'Description must be at least 20 characters';
  }

  if (!category || category === 'all') {
    errors.category = 'Please select a category';
  }

  if (!location?.trim()) {
    errors.location = 'Location is required';
  }

  if (!date) {
    errors.date = 'Event date is required';
  } else if (new Date(date) < new Date(new Date().setHours(0, 0, 0, 0))) {
    errors.date = 'Event date cannot be in the past';
  }

  if (price === '' || price == null) {
    errors.price = 'Price is required';
  } else if (Number(price) < 0) {
    errors.price = 'Price cannot be negative';
  }

  if (!capacity) {
    errors.capacity = 'Capacity is required';
  } else if (Number(capacity) < 1) {
    errors.capacity = 'Capacity must be at least 1';
  }

  return errors;
};

export const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: '', color: 'text.disabled' };

  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  if (score <= 1) return { score: 1, label: 'Weak', color: 'error.main' };
  if (score <= 3) return { score: 2, label: 'Fair', color: 'warning.main' };
  if (score <= 4) return { score: 3, label: 'Good', color: 'info.main' };
  return { score: 4, label: 'Strong', color: 'success.main' };
};
