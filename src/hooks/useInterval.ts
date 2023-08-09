import { useEffect, useRef } from 'react';

interface Interval {
  callback: () => void;
  delay: number | null;
}

export function useInterval({ callback, delay }: Interval): void {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return undefined;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}
