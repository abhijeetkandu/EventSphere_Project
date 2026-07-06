import { useState, useEffect, useCallback } from 'react';
import { adminService } from '../services/adminService';
import { getErrorMessage } from '../utils/errorHandler';

export const useAdminAnalytics = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    monthlyRevenue: [],
    bookingsByMonth: [],
    recentBookings: [],
    topEvents: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnalytics = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await adminService.getAnalytics();
      setStats(data);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load analytics'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return { stats, isLoading, error, refetch: fetchAnalytics };
};
