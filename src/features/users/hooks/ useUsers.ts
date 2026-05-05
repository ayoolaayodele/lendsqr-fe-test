import { useQuery } from '@tanstack/react-query';
import { usersApi } from '../api/users.api';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: usersApi.getUsers,
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => usersApi.getUserById(id),
    enabled: !!id,
  });
};
