import { useDebounce } from '../utils/performance-light';

// Replace entire file content with a simpler hook that uses our lightweight utils
export function useDebouncedSearch(searchTerm: string, delay: number = 300) {
  return useDebounce(searchTerm, delay);
} 