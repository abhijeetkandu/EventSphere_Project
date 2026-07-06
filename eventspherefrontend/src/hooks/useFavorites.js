import { useState, useCallback, useEffect } from 'react';
import { getFavorites, toggleFavorite as toggleStoredFavorite } from '../utils/favorites';
import toast from 'react-hot-toast';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => getFavorites());

  useEffect(() => {
    const handleStorage = () => setFavorites(getFavorites());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const toggleFavorite = useCallback((eventId, eventTitle) => {
    const isNowFavorite = toggleStoredFavorite(eventId);
    setFavorites(getFavorites());

    if (isNowFavorite) {
      toast.success(`Added "${eventTitle}" to favorites`);
    } else {
      toast.success('Removed from favorites');
    }

    return isNowFavorite;
  }, []);

  const isFavorite = useCallback(
    (eventId) => favorites.includes(Number(eventId)),
    [favorites],
  );

  return { favorites, toggleFavorite, isFavorite };
};
