import { throttle, memoize, isEqual, DebouncedFunc, MemoizedFunction } from 'lodash';
import { useRef, useEffect } from 'react';

/**
 * Create a throttled version of a function
 * Useful for scroll, resize, or frequent update events
 */
export const createThrottledHandler = <T extends (...args: any[]) => any>(
  handler: T,
  wait = 100
): DebouncedFunc<T> => {
  return throttle(handler, wait, {
    leading: true,
    trailing: true,
  });
};

/**
 * Memoize expensive computations
 * Useful for complex calculations or transformations
 */
export const memoizeComputation = <T extends (...args: any[]) => any>(
  fn: T,
  resolver?: (...args: Parameters<T>) => any
): T & MemoizedFunction => {
  return memoize(fn, resolver);
};

/**
 * Custom hook for deep comparison in useEffect
 * Prevents unnecessary effect runs when object values haven't changed
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
 * Batch multiple state updates
 * Useful when updating multiple related states
 */
export const batchUpdates = (updates: Array<() => void>) => {
  // React 18+ automatically batches updates, but this ensures compatibility
  updates.forEach(update => update());
};

/**
 * Create a stable reference for callbacks with dependencies
 * Alternative to useCallback with deep comparison
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

  return callbackRef.current as T;
} 