import { useState, useEffect, useCallback } from 'react';
import { bookingService } from '../services/bookingService';
import { getErrorMessage } from '../utils/errorHandler';

export const useDashboard = () => {
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingEvents: 0,
    totalTickets: 0,
    totalSpent: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [upcoming, allBookings] = await Promise.all([
        bookingService.getUpcomingBookings(5),
        bookingService.getMyBookings({ page: 0, size: 50, sort: 'createdAt,desc' }),
      ]);

      setUpcomingBookings(upcoming);
      setRecentBookings(allBookings.bookings.slice(0, 5));

      const totalTickets = allBookings.bookings.reduce((sum, b) => sum + (b.tickets || 0), 0);
      const totalSpent = allBookings.bookings.reduce((sum, b) => sum + (Number(b.totalPrice) || 0), 0);

      setStats({
        totalBookings: allBookings.totalElements,
        upcomingEvents: upcoming.length,
        totalTickets,
        totalSpent,
      });
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load dashboard data'));
      setUpcomingBookings([]);
      setRecentBookings([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return { upcomingBookings, recentBookings, stats, isLoading, error, refetch: fetchDashboard };
};
