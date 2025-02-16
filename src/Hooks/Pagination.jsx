

// eslint-disable-next-line react/prop-types
const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  // Calculate total pages based on total items and items per page
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Generate an array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Handle click event when a page is selected
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Handle next and previous buttons
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="pagination-container flex justify-center items-center mt-6">
      <button
        onClick={handlePrevPage}
        className="px-4 py-2 bg-gray-300 text-black rounded-l"
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {/* Page numbers */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => handlePageChange(number)}
          className={`px-4 py-2 mx-1 rounded ${number === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {number}
        </button>
      ))}

      <button
        onClick={handleNextPage}
        className="px-4 py-2 bg-gray-300 text-black rounded-r"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
