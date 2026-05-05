import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      navigate(query.trim() ? `/users?search=${encodeURIComponent(query.trim())}` : '/users');
    }, 500);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [query, navigate]);

  const submitSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) navigate(`/users?search=${encodeURIComponent(query.trim())}`);
    },
    [query, navigate],
  );

  return { query, setQuery, submitSearch };
};
