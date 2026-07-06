const TOKEN_KEY = 'eventsphere_token';
const USER_KEY = 'eventsphere_user';
const THEME_KEY = 'eventsphere_theme';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  try {
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const setAuth = (token, user) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getStoredTheme = () => localStorage.getItem(THEME_KEY);

export const setStoredTheme = (theme) => {
  localStorage.setItem(THEME_KEY, theme);
};
