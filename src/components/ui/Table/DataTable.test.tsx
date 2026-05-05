import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import DataTable from './DataTable';

interface TestUser {
  id: string;
  username: string;
  email: string;
  status: string;
}

const mockData: TestUser[] = [
  { id: '1', username: 'user1', email: 'user1@test.com', status: 'Active' },
  { id: '2', username: 'user2', email: 'user2@test.com', status: 'Inactive' },
  { id: '3', username: 'user3', email: 'user3@test.com', status: 'Pending' },
];

const columns = [
  {
    key: 'username' as keyof TestUser,
    label: 'Username',
    sortable: true,
    filterable: true,
    filterType: 'text' as const,
  },
  {
    key: 'email' as keyof TestUser,
    label: 'Email',
    sortable: true,
    filterable: true,
    filterType: 'text' as const,
  },
  {
    key: 'status' as keyof TestUser,
    label: 'Status',
    sortable: true,
    filterable: true,
    filterType: 'select' as const,
    filterOptions: [
      { value: 'Active', label: 'Active' },
      { value: 'Inactive', label: 'Inactive' },
    ],
  },
];

describe('DataTable', () => {
  it('renders table with correct column headers', () => {
    render(<DataTable<TestUser> columns={columns} data={mockData} />);

    expect(screen.getByText('USERNAME')).toBeInTheDocument();
    expect(screen.getByText('EMAIL')).toBeInTheDocument();
    expect(screen.getByText('STATUS')).toBeInTheDocument();
  });

  it('renders correct number of rows', () => {
    render(<DataTable<TestUser> columns={columns} data={mockData} />);

    expect(screen.getByText('user1')).toBeInTheDocument();
    expect(screen.getByText('user2')).toBeInTheDocument();
    expect(screen.getByText('user3')).toBeInTheDocument();
  });

  it('shows empty state when no data', () => {
    render(<DataTable<TestUser> columns={columns} data={[]} />);

    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  it('shows pagination info', () => {
    render(<DataTable<TestUser> columns={columns} data={mockData} />);

    expect(screen.getByText(/Showing/)).toBeInTheDocument();
    expect(screen.getByText(/out of 3/)).toBeInTheDocument();
  });
});
