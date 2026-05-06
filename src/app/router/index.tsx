import { Navigate, createHashRouter } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout/AppLayout';
import LoginPage from '../../features/auth/pages/LoginPage';
import PlaceholderPage from '../../features/dashboard/pages/PlaceholderPage';
import UserDetailsPage from '../../features/users/pages/UserDetailsPage';
import UsersPage from '../../features/users/pages/UsersPage';

export const router = createHashRouter([
  { index: true, element: <Navigate to="/login" replace /> },
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/users" replace /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'users/:id', element: <UserDetailsPage /> },
      { path: '*', element: <PlaceholderPage /> },
    ],
  },
]);
