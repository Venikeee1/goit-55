import { useEffect, useRef } from 'react';

export const useWatch = (fn, deps) => {
  const mounted = useRef(false);
  let isMounted;

  if (mounted.current) {
    isMounted = true;
  } else {
    isMounted = false;
    mounted.current = true;
  }

  if (!deps) {
    console.warn('there is no dependencies provided in useWatch hook');
  }

  useEffect(() => {
    if (!isMounted) return;

    fn();
  }, deps);
};
