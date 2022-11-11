import { createContext, useContext, useState, useMemo } from 'react';

const PaginationContext = createContext(0);

export const PaginationProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const providerValue = useMemo(() => {
    return {
      page,
      totalPages,
      setPage,
      setTotalPages,
    };
  }, [page, totalPages]);

  return (
    <PaginationContext.Provider value={providerValue}>
      {children}
    </PaginationContext.Provider>
  );
};

export const usePaginationContext = () => {
  const { page, setPage, totalPages, setTotalPages } =
    useContext(PaginationContext);

  return { page, setPage, totalPages, setTotalPages };
};
