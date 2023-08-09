import { useCallback, useRef } from 'react';

export function useDebounce<T, R>(callback: (value: R) => T, delay?: number) {
  const ref = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (value: R) => {
      if (ref.current) {
        clearTimeout(ref.current);
      }
      ref.current = setTimeout(() => {
        callback(value);
      }, delay || 500);
    },
    [callback, delay]
  );

  return debouncedCallback;
}
