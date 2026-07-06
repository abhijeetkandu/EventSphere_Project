import { useState, useEffect, useCallback } from 'react';
import { eventService } from '../services/eventService';
import { getErrorMessage } from '../utils/errorHandler';

const defaultState = {
  events: [],
  page: 0,
  size: 12,
  totalElements: 0,
  totalPages: 0,
};

export const useEvents = (filters = {}, enabled = true) => {
  const [data, setData] = useState(defaultState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    setError(null);

    try {
      const params = {
        page: filters.page ?? 0,
        size: filters.size ?? 12,
        sort: filters.sort ?? 'eventDate,asc',
      };

      if (filters.search?.trim()) params.search = filters.search.trim();
      if (filters.category && filters.category !== 'all') params.category = filters.category;
      if (filters.minPrice != null) params.minPrice = filters.minPrice;
      if (filters.maxPrice != null) params.maxPrice = filters.maxPrice;
      if (filters.featured) params.featured = true;

      const result = filters.search?.trim()
        ? await eventService.searchEvents(params)
        : await eventService.getEvents(params);

      setData(result);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load events'));
      setData(defaultState);
    } finally {
      setIsLoading(false);
    }
  }, [
    enabled,
    filters.page,
    filters.size,
    filters.sort,
    filters.search,
    filters.category,
    filters.minPrice,
    filters.maxPrice,
    filters.featured,
  ]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { ...data, isLoading, error, refetch: fetchEvents };
};
