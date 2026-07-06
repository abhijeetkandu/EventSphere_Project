import { useState, useEffect, useCallback, useMemo } from 'react';
import { bookingService, isUpcomingBooking, isPastBooking } from '../services/bookingService';
import { getErrorMessage } from '../utils/errorHandler';

export const useBookings = (initialTab = 'all') => {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [tab, setTab] = useState(initialTab);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await bookingService.getMyBookings({
        page: 0,
        size: 100,
        sort: 'createdAt,desc',
      });

      setBookings(result.bookings);
      setTotalPages(result.totalPages);
      setTotalElements(result.totalElements);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load bookings'));
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const filteredBookings = useMemo(() => {
    let result = [...bookings];

    if (tab === 'upcoming') {
      result = result.filter(isUpcomingBooking);
    } else if (tab === 'past') {
      result = result.filter(isPastBooking);
    }

    if (statusFilter !== 'all') {
      result = result.filter((b) => b.status?.toUpperCase() === statusFilter.toUpperCase());
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.eventTitle?.toLowerCase().includes(q) ||
          b.ticketCode?.toLowerCase().includes(q) ||
          b.location?.toLowerCase().includes(q),
      );
    }

    return result;
  }, [bookings, tab, statusFilter, search]);

  const stats = useMemo(
    () => ({
      all: bookings.length,
      upcoming: bookings.filter(isUpcomingBooking).length,
      past: bookings.filter(isPastBooking).length,
    }),
    [bookings],
  );

  const removeBooking = useCallback((id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const updateBooking = useCallback((updated) => {
    setBookings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  }, []);

  return {
    bookings: filteredBookings,
    allBookings: bookings,
    page,
    setPage,
    totalPages,
    totalElements,
    tab,
    setTab,
    statusFilter,
    setStatusFilter,
    search,
    setSearch,
    stats,
    isLoading,
    error,
    refetch: fetchBookings,
    removeBooking,
    updateBooking,
  };
};
