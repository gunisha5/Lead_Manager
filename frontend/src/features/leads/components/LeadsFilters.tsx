import React from 'react';
import { Search } from 'lucide-react';
import { LeadStatus, LeadSource } from '../types';

interface LeadsFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  source: string;
  onSourceChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
}

const selectClass =
  'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors';

export const LeadsFilters: React.FC<LeadsFiltersProps> = ({
  search, onSearchChange,
  status, onStatusChange,
  source, onSourceChange,
  sort, onSortChange,
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm mb-6 transition-colors">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-0 sm:min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Filters row */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select value={status} onChange={(e) => onStatusChange(e.target.value)} className={selectClass}>
            <option value="">All Statuses</option>
            {Object.values(LeadStatus).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select value={source} onChange={(e) => onSourceChange(e.target.value)} className={selectClass}>
            <option value="">All Sources</option>
            {Object.values(LeadSource).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select value={sort} onChange={(e) => onSortChange(e.target.value)} className={selectClass}>
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>
    </div>
  );
};
