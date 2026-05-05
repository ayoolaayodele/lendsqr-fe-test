import { STORAGE_KEYS } from '../../../utils/constants/api';
import type { User } from '../types/user.types';

export const userDetailsStorage = {
  get: (id: string): User | null => {
    try {
      const data = localStorage.getItem(`${STORAGE_KEYS.USER_DETAIL}_${id}`);
      return data ? JSON.parse(data) : null;
    } catch {
      console.error('Failed to retrieve user details from storage');
      return null;
    }
  },

  set: (id: string, user: User): void => {
    try {
      localStorage.setItem(`${STORAGE_KEYS.USER_DETAIL}_${id}`, JSON.stringify(user));
    } catch {
      console.error('Failed to store user details');
    }
  },

  remove: (id: string): void => {
    localStorage.removeItem(`${STORAGE_KEYS.USER_DETAIL}_${id}`);
  },
};
