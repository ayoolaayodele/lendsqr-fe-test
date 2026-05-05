import { useQuery } from '@tanstack/react-query';
import { usersApi } from '../api/users.api';
import { QUERY_KEYS } from '../../../utils/constants/api';

export const useUsers = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: usersApi.getUsers,
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER, id],
    queryFn: () => usersApi.getUserById(id),
    enabled: !!id,
  });
};
