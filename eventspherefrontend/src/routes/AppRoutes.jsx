import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { AdminRoute } from './AdminRoute';
import { GuestRoute } from './GuestRoute';
import { LoadingPage } from '../pages/errors/LoadingPage';

const LandingPage = lazy(() => import('../pages/landing/LandingPage'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('../pages/auth/ForgotPasswordPage'));
const EventsPage = lazy(() => import('../pages/events/EventsPage'));
const EventDetailsPage = lazy(() => import('../pages/events/EventDetailsPage'));
const DashboardPage = lazy(() => import('../pages/user/DashboardPage'));
const MyTicketsPage = lazy(() => import('../pages/user/MyTicketsPage'));
const MyBookingsPage = lazy(() => import('../pages/booking/MyBookingsPage'));
const BookingDetailsPage = lazy(() => import('../pages/booking/BookingDetailsPage'));
const ProfilePage = lazy(() => import('../pages/profile/ProfilePage'));
const SettingsPage = lazy(() => import('../pages/user/SettingsPage'));
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage'));
const AdminEventsPage = lazy(() => import('../pages/admin/AdminEventsPage'));
const AdminUsersPage = lazy(() => import('../pages/admin/AdminUsersPage'));
const AdminBookingsPage = lazy(() => import('../pages/admin/AdminBookingsPage'));
const NotFoundPage = lazy(() => import('../pages/errors/NotFoundPage'));
const AccessDeniedPage = lazy(() => import('../pages/errors/AccessDeniedPage'));

const LazyRoute = ({ element }) => (
  <Suspense fallback={<LoadingPage />}>{element}</Suspense>
);

export const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route index element={<LazyRoute element={<LandingPage />} />} />
      <Route path="events" element={<LazyRoute element={<EventsPage />} />} />
      <Route path="events/:id" element={<LazyRoute element={<EventDetailsPage />} />} />
    </Route>

    <Route
      element={
        <GuestRoute>
          <AuthLayout />
        </GuestRoute>
      }
    >
      <Route path="login" element={<LazyRoute element={<LoginPage />} />} />
      <Route path="register" element={<LazyRoute element={<RegisterPage />} />} />
      <Route path="forgot-password" element={<LazyRoute element={<ForgotPasswordPage />} />} />
    </Route>

    <Route
      element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }
    >
      <Route path="dashboard" element={<LazyRoute element={<DashboardPage />} />} />
      <Route path="dashboard/tickets" element={<LazyRoute element={<MyTicketsPage />} />} />
      <Route path="dashboard/bookings" element={<LazyRoute element={<MyBookingsPage />} />} />
      <Route path="dashboard/bookings/:id" element={<LazyRoute element={<BookingDetailsPage />} />} />
      <Route path="dashboard/profile" element={<LazyRoute element={<ProfilePage />} />} />
      <Route path="dashboard/settings" element={<LazyRoute element={<SettingsPage />} />} />
    </Route>

    <Route
      element={
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      }
    >
      <Route path="admin" element={<LazyRoute element={<AdminDashboardPage />} />} />
      <Route path="admin/events" element={<LazyRoute element={<AdminEventsPage />} />} />
      <Route path="admin/users" element={<LazyRoute element={<AdminUsersPage />} />} />
      <Route path="admin/bookings" element={<LazyRoute element={<AdminBookingsPage />} />} />
    </Route>

    <Route path="access-denied" element={<LazyRoute element={<AccessDeniedPage />} />} />
    <Route path="*" element={<LazyRoute element={<NotFoundPage />} />} />
  </Routes>
);
