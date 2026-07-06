import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../utils/constants';
import { LoadingPage } from '../pages/errors/LoadingPage';

export const GuestRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, isInitializing } = useAuth();
  const location = useLocation();

  if (isInitializing) {
    return <LoadingPage />;
  }

  if (isAuthenticated) {
    const from = location.state?.from?.pathname;
    if (from) return <Navigate to={from} replace />;
    return <Navigate to={isAdmin ? ROUTES.ADMIN : ROUTES.DASHBOARD} replace />;
  }

  return children;
};
