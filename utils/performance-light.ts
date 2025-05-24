import { useRef, useEffect, useCallback, useState } from 'react';

/**
 * Lightweight debounce implementation
 * Replaces lodash debounce (~4KB savings)
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 300,
  immediate: boolean = false
): T & { cancel: () => void } {
  let timeout: NodeJS.Timeout | null = null;
  
  const debounced = function (this: any, ...args: any[]) {
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    
    const callNow = immediate && !timeout;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(this, args);
  } as T & { cancel: () => void };
  
  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  
  return debounced;
}

/**
 * Lightweight throttle implementation
 * Replaces lodash throttle (~3KB savings)
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 100,
  options: { leading?: boolean; trailing?: boolean } = {}
): T & { cancel: () => void } {
  const { leading = true, trailing = true } = options;
  let timeout: NodeJS.Timeout | null = null;
  let previous = 0;
  let result: any;
  
  const throttled = function (this: any, ...args: any[]) {
    const now = Date.now();
    if (!previous && !leading) previous = now;
    const remaining = wait - (now - previous);
    
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(this, args);
    } else if (!timeout && trailing) {
      timeout = setTimeout(() => {
        previous = !leading ? 0 : Date.now();
        timeout = null;
        result = func.apply(this, args);
      }, remaining);
    }
    
    return result;
  } as T & { cancel: () => void };
  
  throttled.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    previous = 0;
  };
  
  return throttled;
}

/**
 * Lightweight deep equality check
 * Replaces lodash isEqual (~8KB savings)
 */
export function isEqual(a: any, b: any): boolean {
  if (a === b) return true;
  
  if (a == null || b == null) return false;
  if (typeof a !== typeof b) return false;
  
  // Handle arrays
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return false;
    return a.every((item, index) => isEqual(item, b[index]));
  }
  
  // Handle objects
  if (typeof a === 'object') {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    
    if (keysA.length !== keysB.length) return false;
    return keysA.every(key => keysB.includes(key) && isEqual(a[key], b[key]));
  }
  
  return false;
}

/**
 * Simple memoization
 * Replaces lodash memoize (~2KB savings)
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  getKey?: (...args: any[]) => string
): T & { cache: Map<string, any>; clear: () => void } {
  const cache = new Map<string, any>();
  
  const memoized = function (...args: any[]) {
    const key = getKey ? getKey(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  } as T & { cache: Map<string, any>; clear: () => void };
  
  memoized.cache = cache;
  memoized.clear = () => cache.clear();
  
  return memoized;
}

/**
 * Custom hook for debounced values
 * Replaces useDebouncedSearch hook with lodash
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

/**
 * Custom hook for deep comparison in useEffect
 * Replaces lodash-based useDeepCompareEffect
 */
export function useDeepCompareEffect(
  callback: () => void | (() => void),
  dependencies: any[]
) {
  const currentDependenciesRef = useRef<any[]>([]);

  if (!isEqual(currentDependenciesRef.current, dependencies)) {
    currentDependenciesRef.current = dependencies;
  }

  useEffect(callback, [currentDependenciesRef.current]);
}

/**
 * Custom hook for stable callbacks with deep comparison
 * Replaces lodash-based useStableCallback
 */
export function useStableCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: any[]
): T {
  const callbackRef = useRef(callback);
  const depsRef = useRef(deps);

  if (!isEqual(depsRef.current, deps)) {
    callbackRef.current = callback;
    depsRef.current = deps;
  }

  return useCallback(callbackRef.current, []);
}

/**
 * Find difference between arrays
 * Replaces lodash difference (~1KB savings)
 */
export function difference<T>(array: T[], ...excludeArrays: T[][]): T[] {
  const excludeSet = new Set(excludeArrays.flat());
  return array.filter(item => !excludeSet.has(item));
} 