import { useState, useCallback, useMemo } from 'react';
import { debounce } from 'lodash';

interface UseDebouncedSearchOptions {
  delay?: number;
  maxWait?: number;
}

export function useDebouncedSearch<T>(
  items: T[],
  searchKey: keyof T,
  options: UseDebouncedSearchOptions = {}
) {
  const { delay = 300, maxWait = 1000 } = options;
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Create debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce((term: string) => {
        setSearchTerm(term);
        setIsSearching(false);
      }, delay, { maxWait }),
    [delay, maxWait]
  );

  // Handle search input
  const handleSearch = useCallback(
    (value: string) => {
      setIsSearching(true);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  // Filter items based on search term
  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;

    const lowerSearchTerm = searchTerm.toLowerCase();
    return items.filter((item) => {
      const value = String(item[searchKey]).toLowerCase();
      return value.includes(lowerSearchTerm);
    });
  }, [items, searchTerm, searchKey]);

  return {
    searchTerm,
    filteredItems,
    isSearching,
    handleSearch,
  };
} 