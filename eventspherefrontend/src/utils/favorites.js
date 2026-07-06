const FAVORITES_KEY = 'eventsphere_favorites';

export const getFavorites = () => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const isFavorite = (eventId) => getFavorites().includes(Number(eventId));

export const toggleFavorite = (eventId) => {
  const id = Number(eventId);
  const favorites = getFavorites();
  const exists = favorites.includes(id);
  const updated = exists ? favorites.filter((f) => f !== id) : [...favorites, id];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return !exists;
};
