import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import UsersPage from './UsersPage';

vi.mock('../api/users.api', () => ({
  usersApi: {
    getUsers: vi.fn(),
  },
}));

import { usersApi } from '../api/users.api';

const mockUsers = [
  {
    id: '1',
    organization: 'Lendsqr',
    username: 'testuser',
    email: 'test@lendsqr.com',
    phone: '08012345678',
    dateJoined: 'May 15, 2020 10:00 AM',
    status: 'Active',
    fullName: 'Test User',
    bvn: '22212345678',
    gender: 'Male',
    maritalStatus: 'Single',
    children: 'None',
    typeOfResidence: 'Own Apartment',
    levelOfEducation: 'B.Sc',
    employmentStatus: 'Employed',
    sectorOfEmployment: 'FinTech',
    durationOfEmployment: '2 years',
    officeEmail: 'test@company.com',
    monthlyIncome: '₦200,000.00 - ₦400,000.00',
    loanRepayment: '40,000',
    twitter: '@test',
    facebook: 'Test User',
    instagram: '@test',
    tier: 1,
    accountBalance: '₦200,000.00',
    accountNumber: '9912345678',
    bankName: 'Providus Bank',
    guarantors: [],
  },
];

function renderWithProviders() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  const router = createMemoryRouter([{ path: '/users', element: <UsersPage /> }], {
    initialEntries: ['/users'],
  });

  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

describe('UsersPage', () => {
  it('renders the users page title', () => {
    (usersApi.getUsers as ReturnType<typeof vi.fn>).mockResolvedValue([]);
    renderWithProviders();

    expect(screen.getByRole('heading', { name: 'Users', level: 1 })).toBeInTheDocument();
  });
  it('renders all four stats cards', () => {
    (usersApi.getUsers as ReturnType<typeof vi.fn>).mockResolvedValue([]);
    renderWithProviders();

    expect(screen.getAllByText('Users')).toHaveLength(2);
    expect(screen.getByText('Active Users')).toBeInTheDocument();
    expect(screen.getByText('Users with Loans')).toBeInTheDocument();
    expect(screen.getByText('Users with Savings')).toBeInTheDocument();
  });
  it('shows loading spinner initially', () => {
    (usersApi.getUsers as ReturnType<typeof vi.fn>).mockReturnValue(new Promise(() => {}));
    renderWithProviders();

    expect(document.querySelector('.spinner')).toBeInTheDocument();
  });

  it('shows error state when API fails', async () => {
    (usersApi.getUsers as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Network error'));
    renderWithProviders();

    expect(await screen.findByText('Error loading users')).toBeInTheDocument();
  });

  it('renders user data in the table', async () => {
    (usersApi.getUsers as ReturnType<typeof vi.fn>).mockResolvedValue(mockUsers);
    renderWithProviders();

    expect(await screen.findByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('test@lendsqr.com')).toBeInTheDocument();
  });
});
