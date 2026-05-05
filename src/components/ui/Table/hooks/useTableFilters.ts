import { useState, useRef, useCallback } from 'react';

export const useTableFilters = () => {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [localFilters, setLocalFilters] = useState<Record<string, string>>({});
  const debounceTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const clearAllTimers = useCallback(() => {
    Object.values(debounceTimers.current).forEach(clearTimeout);
  }, []);

  // ✅ Replace useEffect with a wrapper function
  const resetFilters = useCallback(() => {
    clearAllTimers();
    setFilters({});
    setLocalFilters({});
  }, [clearAllTimers]);

  const handleFilterChange = useCallback((key: string, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));

    if (debounceTimers.current[key]) {
      clearTimeout(debounceTimers.current[key]);
    }

    debounceTimers.current[key] = setTimeout(() => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }, 400);
  }, []);

  const handleFilterImmediate = useCallback((key: string, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  return { filters, localFilters, handleFilterChange, handleFilterImmediate, resetFilters };
};
