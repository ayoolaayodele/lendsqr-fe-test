import { Navigate, createBrowserRouter } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout/AppLayout';
import LoginPage from '../../features/auth/pages/LoginPage';
import PlaceholderPage from '../../features/dashboard/pages/PlaceholderPage';
import UsersPage from '../../features/users/pages/UsersPage';
import UserDetailsPage from '../../features/users/pages/UserDetailsPage';

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <LoginPage /> },
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/users" replace /> },
      { path: '/users', element: <UsersPage /> },
      { path: '/users/:id', element: <UserDetailsPage /> },
      { path: '*', element: <PlaceholderPage /> },
    ],
  },
]);
