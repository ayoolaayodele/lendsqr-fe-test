import { useState } from 'react';

export const useTableSort = () => {
  const [sort, setSort] = useState<{ key: string | null; dir: 'asc' | 'desc' | null }>({
    key: null,
    dir: null,
  });

  const handleSort = (key: string) => {
    setSort((prev) => {
      if (prev.key !== key) {
        // New column → sort ascending
        return { key, dir: 'asc' };
      }
      if (prev.dir === 'asc') {
        // Same column, was ascending → sort descending
        return { key, dir: 'desc' };
      }
      return { key: null, dir: null };
    });
  };

  return { sortKey: sort.key, sortDir: sort.dir, handleSort };
};
