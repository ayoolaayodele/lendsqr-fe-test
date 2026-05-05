// src/features/users/pages/UsersPage.tsx
import { useNavigate, useSearchParams } from 'react-router-dom';
import StatsCard from '../../../components/ui/StatsCard/StatsCard';
import DataTable from '../../../components/ui/Table/DataTable';
import Spinner from '../../../components/ui/Spinner/Spinner';
import { statsConfig } from '../data/statsConfig';
import { userColumns } from '../data/tableColumns';
import { useFilteredUsers } from '../hooks/useFilteredUsers';
import type { User } from '../types/user.types';
import './UsersPage.scss';

export default function UsersPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const { users, isLoading, error } = useFilteredUsers(searchQuery);

    const navigate = useNavigate();

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
        {isLoading && <Spinner />}
        {error && (
          <div className="users-page__error">
            <div className="users-page__error-icon">!</div>
            <p className="users-page__error-title">Error loading users</p>
            <p className="users-page__error-message">{error.message}</p>
          </div>
        )}
        {!isLoading && !error && (
          <DataTable<User>
            columns={userColumns}
            data={users}
            onRowAction={(user) => navigate(`/users/${user.id}`)}
          />
        )}
      </div>
    </section>
  );
}
