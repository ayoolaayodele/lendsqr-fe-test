import httpClient from '../../../services/http/client';
import { ENDPOINTS } from '../../../utils/constants/api';
import type { User } from '../types/user.types';

export const usersApi = {
  getUsers: (): Promise<User[]> => {
    return httpClient.get(ENDPOINTS.USERS) as Promise<User[]>;
  },

  getUserById: async (id: string): Promise<User> => {
    const users = (await httpClient.get(ENDPOINTS.USERS)) as User[];
    const user = users.find((u) => u.id === id);
    if (!user) throw new Error('User not found');
    return user;
  },
};
