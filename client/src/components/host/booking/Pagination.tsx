import { Pagination as PaginationType } from "../../../types/dashboard";

interface PaginationProps {
  pagination: PaginationType;
  setPagination: React.Dispatch<React.SetStateAction<PaginationType>>;
}

const Pagination = ({ pagination, setPagination }: PaginationProps) => {
  if (pagination.totalPages <= 1) return null;

  return (
    <div className="mt-6 flex justify-center space-x-2">
      <button
        onClick={() =>
          setPagination((prev) => ({
            ...prev,
            currentPage: Math.max(prev.currentPage - 1, 1),
          }))
        }
        disabled={pagination.currentPage === 1}
        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:bg-gray-200 dark:disabled:bg-gray-600 disabled:opacity-50"
      >
        Previous
      </button>
      <span className="px-4 py-2 text-gray-700 dark:text-gray-300">
        Page {pagination.currentPage} of {pagination.totalPages}
      </span>
      <button
        onClick={() =>
          setPagination((prev) => ({
            ...prev,
            currentPage: Math.min(prev.currentPage + 1, pagination.totalPages),
          }))
        }
        disabled={pagination.currentPage === pagination.totalPages}
        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:bg-gray-200 dark:disabled:bg-gray-600 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
