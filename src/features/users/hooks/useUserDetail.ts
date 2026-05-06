// src/features/users/hooks/useUserDetail.ts
import { useQuery } from '@tanstack/react-query';
import { usersApi } from '../api/users.api';
import { QUERY_KEYS } from '../../../utils/constants/api';
import { userDetailsStorage } from '../storage/userDetails.storage';

export const useUserDetail = (id: string) => {
  const cachedUser = userDetailsStorage.get(id);

  return useQuery({
    queryKey: [QUERY_KEYS.USER, id],
    queryFn: async () => {
      if (cachedUser) return cachedUser;
      const user = await usersApi.getUserById(id);
      userDetailsStorage.set(id, user);
      return user;
    },
    initialData: cachedUser || undefined,
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};
