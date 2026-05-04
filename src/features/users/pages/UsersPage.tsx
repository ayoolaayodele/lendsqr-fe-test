// src/features/users/pages/UsersPage.tsx
import StatsCard from '../../../components/ui/StatsCard/StatsCard';
import { statsConfig } from '../data/statsConfig';
import { userStatusConfig } from '../data/statusConfig';
import { mockUsers } from '../data/mockUsers';
import type { User } from '../types/user.types';
import './UsersPage.scss';
import DataTable from '../../../components/ui/Table/DataTable';
import StatusBadge from '../../../components/ui/Badge/StatusBadge';

export default function UsersPage() {
  const columns = [
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
      key: 'dateJoined' as keyof User,
      label: 'Date',
      sortable: true,
      filterable: true,
      filterType: 'date' as const,
    },
    {
      key: 'phone' as keyof User,
      label: 'Phone Number',
      sortable: true,
      filterable: true,
      filterType: 'text' as const,
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
  return (
    <section className="users-page">
      <h1 className="users-page__title">Users</h1>

      <div className="users-page__stats">
        {statsConfig.map((stat) => (
          <StatsCard
            key={stat.title}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
            variant={stat.variant}
          />
        ))}
      </div>

      <div className="users-page__table-section">
        <DataTable<User> columns={columns} data={mockUsers} />
      </div>
    </section>
  );
}
