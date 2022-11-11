import { usePaginationContext } from '../../context/pagination';

export const Pagination = () => {
  const { page, setPage, totalPages } = usePaginationContext();

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <button onClick={handlePrevPage} disabled={page <= 1}>
        Prev
      </button>
      <span>
        {page} / {totalPages}
      </span>
      <button onClick={handleNextPage} disabled={page >= totalPages}>
        Next
      </button>
    </div>
  );
};
