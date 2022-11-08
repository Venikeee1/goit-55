import { useEffect, useRef } from 'react';

export const useWatch = (fn, deps) => {
  const mounted = useRef(false);

  if (!deps) {
    console.warn('there is no dependencies provided in useWatch hook');
  }
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;

      return;
    }

    fn();
  }, deps);
};
