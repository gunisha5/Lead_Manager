import React, { useMemo } from 'react';
import { Lead } from '../types';
import { format } from 'date-fns';
import { Edit2, Trash2, Mail, Users } from 'lucide-react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { usePermissions } from '@/features/auth/hooks';

interface LeadsTableProps {
  leads: Lead[];
  isLoading: boolean;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

const columnHelper = createColumnHelper<Lead>();

const statusColors: Record<string, string> = {
  New: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  Contacted: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  Qualified: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  Lost: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
};

// Loading skeleton row
const SkeletonRow = () => (
  <tr className="animate-pulse">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <td key={i} className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      </td>
    ))}
  </tr>
);

export const LeadsTable: React.FC<LeadsTableProps> = ({ leads, isLoading, onEdit, onDelete }) => {
  const { canDeleteLead, canEditLead } = usePermissions();

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Lead Name',
        cell: (info) => (
          <div className="font-medium text-gray-900 dark:text-white">{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor('email', {
        header: 'Contact Info',
        cell: (info) => (
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate max-w-[160px]">{info.getValue()}</span>
          </div>
        ),
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => {
          const status = info.getValue();
          return (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
              {status}
            </span>
          );
        },
      }),
      columnHelper.accessor('source', {
        header: 'Source',
        cell: (info) => (
          <div className="text-gray-500 dark:text-gray-400 text-sm">{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor('createdAt', {
        header: 'Date Added',
        cell: (info) => (
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            {format(new Date(info.getValue()), 'MMM dd, yyyy')}
          </div>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: (info) => (
          <div className="flex justify-end space-x-1">
            {canEditLead && (
              <button
                onClick={() => onEdit(info.row.original)}
                className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                title="Edit"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            )}
            {canDeleteLead && (
              <button
                onClick={() => onDelete(info.row.original)}
                className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ),
      }),
    ],
    [onEdit, onDelete, canDeleteLead, canEditLead]
  );

  const table = useReactTable({
    data: leads,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm transition-colors">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {['Lead Name', 'Contact Info', 'Status', 'Source', 'Date Added', 'Actions'].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {[...Array(5)].map((_, i) => <SkeletonRow key={i} />)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="text-center p-16 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col items-center transition-colors">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
          <Users className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No leads found</h3>
        <p className="mt-1 text-gray-500 dark:text-gray-400 max-w-sm mx-auto text-sm">
          No leads match your current filters. Try adjusting your search or create a new lead.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm transition-colors">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-700">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
