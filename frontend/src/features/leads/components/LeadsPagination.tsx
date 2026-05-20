import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LeadsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  onPageChange: (page: number) => void;
}

export const LeadsPagination: React.FC<LeadsPaginationProps> = ({
  currentPage,
  totalPages,
  totalRecords,
  onPageChange,
}) => {
  const btnBase =
    'relative inline-flex items-center px-2 py-2 text-gray-400 dark:text-gray-500 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0 disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-white dark:bg-gray-900';

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 sm:px-6 rounded-b-xl shadow-sm transition-colors">
      {/* Total count */}
      <p className="text-sm text-gray-600 dark:text-gray-400 order-2 sm:order-1">
        Showing <span className="font-semibold text-gray-900 dark:text-white">{totalRecords}</span> result{totalRecords !== 1 ? 's' : ''}
      </p>

      {/* Prev / Page / Next */}
      <nav className="isolate inline-flex -space-x-px rounded-lg shadow-sm overflow-hidden order-1 sm:order-2" aria-label="Pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`${btnBase} rounded-l-lg`}
        >
          <span className="sr-only">Previous</span>
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 bg-white dark:bg-gray-900 focus:outline-offset-0 select-none">
          {currentPage} / {totalPages || 1}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={`${btnBase} rounded-r-lg`}
        >
          <span className="sr-only">Next</span>
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
};
