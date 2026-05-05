import type { AxiosError } from 'axios';

export interface AppError {
  message: string;
  status?: number;
  code?: string;
}

export const handleApiError = (error: unknown): AppError => {
  if (error instanceof Error) {
    if ((error as AxiosError).isAxiosError) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return {
          message:
            ((axiosError.response.data as Record<string, unknown>)?.message as string) ||
            `Server error: ${axiosError.response.status}`,
          status: axiosError.response.status,
        };
      } else if (axiosError.request) {
        return {
          message: 'Network error. Please check your connection.',
          code: 'NETWORK_ERROR',
        };
      }
    }
    return { message: error.message || 'An unexpected error occurred' };
  }
  return { message: 'An unexpected error occurred' };
};
