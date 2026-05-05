import { useState, useMemo } from 'react';

export const useTablePagination = (total: number) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;

  const resetPage = () => setPage(1);

  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push('...');
      if (totalPages > 1) pages.push(totalPages);
    }
    return pages;
  }, [page, totalPages]);

  return { page, perPage, totalPages, start, pageNumbers, setPage, setPerPage, resetPage };
};
