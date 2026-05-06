import httpClient from '../../../services/http/client';
import { ENDPOINTS } from '../../../utils/constants/api';
import { userDetailsStorage } from '../storage/userDetails.storage';
import type { User } from '../types/user.types';

export const usersApi = {
  getUsers: (): Promise<User[]> => {
    return httpClient.get(ENDPOINTS.USERS) as Promise<User[]>;
  },

  getUserById: async (id: string): Promise<User> => {
    // ✅ First check localStorage
    const cached = userDetailsStorage.get(id);
    if (cached) return cached;

    // Then fetch from API
    const users = (await httpClient.get(ENDPOINTS.USERS)) as User[];
    const user = users.find((u) => u.id === id);

    if (!user) throw new Error('User not found');

    // Cache for future
    userDetailsStorage.set(id, user);
    return user;
  },
};
