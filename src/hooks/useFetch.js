import { useState, useEffect } from 'react';

export const useFetch = (asyncRequest, deps) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('stale');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setStatus('loading');

    asyncRequest()
      .then((result) => {
        setData(result);
        setError(null);
        setStatus('fulfilled');
      })
      .catch((error) => {
        setError(error);
        setStatus('rejected');
      })
      .finally(() => {
        setLoading(false);
      });
  }, deps);

  return { data, status, isLoading, error };
};
