import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../utils/constants';
import { LoadingPage } from '../pages/errors/LoadingPage';

export const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, isInitializing } = useAuth();

  if (isInitializing) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (!isAdmin) {
    return <Navigate to={ROUTES.ACCESS_DENIED} replace />;
  }

  return children;
};
