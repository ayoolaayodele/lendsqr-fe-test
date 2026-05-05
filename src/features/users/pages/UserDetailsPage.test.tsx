import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import UserDetailsPage from './UserDetailsPage';

vi.mock('../../../services/http/client', () => ({
  default: { get: vi.fn() },
}));

import httpClient from '../../../services/http/client';

const mockUser = {
  id: '69f8525b7b60f600e62b22dd',
  fullName: 'Grace Effiom',
  organization: 'Lendsqr',
  username: 'testuser',
  email: 'test@lendsqr.com',
  phone: '08012345678',
  dateJoined: 'May 15, 2020 10:00 AM',
  status: 'Active',
  bvn: '22212345678',
  gender: 'Female',
  maritalStatus: 'Single',
  children: 'None',
  typeOfResidence: "Parent's Apartment",
  levelOfEducation: 'B.Sc',
  employmentStatus: 'Employed',
  sectorOfEmployment: 'FinTech',
  durationOfEmployment: '2 years',
  officeEmail: 'grace@lendsqr.com',
  monthlyIncome: '₦200,000.00 - ₦400,000.00',
  loanRepayment: '40,000',
  twitter: '@grace_effiom',
  facebook: 'Grace Effiom',
  instagram: '@grace_effiom',
  tier: 1,
  accountBalance: '₦200,000.00',
  accountNumber: '9912345678',
  bankName: 'Providus Bank',
  guarantors: [
    {
      fullName: 'Debby Ogana',
      phone: '08012345678',
      email: 'debby@gmail.com',
      relationship: 'Sister',
    },
  ],
};

function renderWithProviders(id = '69f8525b7b60f600e62b22dd') {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const router = createMemoryRouter([{ path: '/users/:id', element: <UserDetailsPage /> }], {
    initialEntries: [`/users/${id}`],
  });
  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

describe('UserDetailsPage', () => {
  beforeEach(() => vi.clearAllMocks());

  it('shows loading spinner initially', () => {
    (httpClient.get as ReturnType<typeof vi.fn>).mockReturnValue(new Promise(() => {}));
    renderWithProviders();
    expect(document.querySelector('.spinner')).toBeInTheDocument();
  });

  it('renders user details when user is found', async () => {
    (httpClient.get as ReturnType<typeof vi.fn>).mockResolvedValue([mockUser]);
    renderWithProviders();

    expect(await screen.findAllByText('Grace Effiom')).toHaveLength(3);
    expect(screen.getByText('Back to Users')).toBeInTheDocument();
  });

  it('shows error when user is not found', async () => {
    (httpClient.get as ReturnType<typeof vi.fn>).mockResolvedValue([]);
    renderWithProviders('nonexistent-id');
    expect(await screen.findByText('User not found')).toBeInTheDocument();
  });
});
