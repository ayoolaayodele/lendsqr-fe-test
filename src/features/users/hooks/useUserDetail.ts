import { useQuery } from '@tanstack/react-query';
import { usersApi } from '../api/users.api';
import { QUERY_KEYS } from '../../../utils/constants/api';
import { userDetailsStorage } from '../storage/userDetails.storage';

export const useUserDetail = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER, id],
    queryFn: async () => {
      const cached = userDetailsStorage.get(id);
      if (cached) return cached;

      const user = await usersApi.getUserById(id);
      userDetailsStorage.set(id, user);

      return user;
    },
    enabled: !!id,
  });
};
