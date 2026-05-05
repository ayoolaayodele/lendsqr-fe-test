import StatusBadge from '../../../components/ui/Badge/StatusBadge';
import { userStatusConfig } from './statusConfig';
import { formatPhoneNumber } from '../../../utils/formatters/phoneFormatter';
import type { User } from '../types/user.types';

export const userColumns = [
  {
    key: 'organization' as keyof User,
    label: 'Organization',
    sortable: true,
    filterable: true,
    filterType: 'select' as const,
    filterOptions: [
      { value: 'Lendsqr', label: 'Lendsqr' },
      { value: 'Irorun', label: 'Irorun' },
      { value: 'Lendstar', label: 'Lendstar' },
      { value: 'Flutterwave', label: 'Flutterwave' },
      { value: 'Paystack', label: 'Paystack' },
    ],
  },
  {
    key: 'username' as keyof User,
    label: 'Username',
    sortable: true,
    filterable: true,
    filterType: 'text' as const,
  },
  {
    key: 'email' as keyof User,
    label: 'Email',
    sortable: true,
    filterable: true,
    filterType: 'text' as const,
  },
  {
    key: 'phone' as keyof User,
    label: 'Phone Number',
    sortable: true,
    filterable: true,
    filterType: 'text' as const,
    render: (user: User) => formatPhoneNumber(user.phone),
  },
  {
    key: 'dateJoined' as keyof User,
    label: 'Date',
    sortable: true,
    filterable: true,
    filterType: 'date' as const,
  },
  {
    key: 'status' as keyof User,
    label: 'Status',
    sortable: true,
    filterable: true,
    filterType: 'select' as const,
    filterOptions: [
      { value: 'Active', label: 'Active' },
      { value: 'Inactive', label: 'Inactive' },
      { value: 'Pending', label: 'Pending' },
      { value: 'Blacklisted', label: 'Blacklisted' },
    ],
    render: (user: User) => {
      const config = userStatusConfig[user.status as keyof typeof userStatusConfig];
      return <StatusBadge status={config.label} color={config.color} bgColor={config.bgColor} />;
    },
  },
];
