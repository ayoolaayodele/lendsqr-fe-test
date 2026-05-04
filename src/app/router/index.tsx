import { Navigate, createBrowserRouter } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout/AppLayout';
import LoginPage from '../../features/auth/pages/LoginPage';
import DashboardPage from '../../features/dashboard/pages/DashboardPage';
import UsersPage from '../../features/users/pages/UsersPage';
import UserDetailsPage from '../../features/users/pages/UserDetailsPage';

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <LoginPage /> },
  {
    element: <AppLayout />,
    children: [
      // Users is the default route after login
      { index: true, element: <Navigate to="/users" replace /> },
      { path: '/users', element: <UsersPage /> },
      { path: '/users/:id', element: <UserDetailsPage /> },
      { path: '/dashboard', element: <DashboardPage /> },
    ],
  },
]);
