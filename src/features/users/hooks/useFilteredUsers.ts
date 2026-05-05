import { useMemo } from 'react';
import {useUsers} from './ useUsers';

export const useFilteredUsers = (searchQuery: string) => {
  const { data: users = [], isLoading, error } = useUsers();

  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users;

    const query = searchQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.organization.toLowerCase().includes(query) ||
        user.fullName.toLowerCase().includes(query) ||
        String(user.phone).includes(query),
    );
  }, [users, searchQuery]);

  return { users: filteredUsers, isLoading, error };
};
