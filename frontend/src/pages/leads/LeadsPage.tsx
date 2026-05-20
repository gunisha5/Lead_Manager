import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Download } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { useLeads, useExportLeads } from '@/features/leads/hooks';
import { usePermissions } from '@/features/auth/hooks';
import { exportToCsv } from '@/lib/csv';
import { LeadsFilters } from '@/features/leads/components/LeadsFilters';
import { LeadsTable } from '@/features/leads/components/LeadsTable';
import { LeadsPagination } from '@/features/leads/components/LeadsPagination';
import { CreateLeadModal } from '@/features/leads/components/CreateLeadModal';
import { EditLeadModal } from '@/features/leads/components/EditLeadModal';
import { DeleteLeadModal } from '@/features/leads/components/DeleteLeadModal';
import { LeadFilters, Lead } from '@/features/leads/types';
import { Button } from '@/components/ui/Button';

export const LeadsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editLead, setEditLead] = useState<Lead | null>(null);
  const [deleteLead, setDeleteLead] = useState<Lead | null>(null);

  const { canCreateLead } = usePermissions();

  // Local state for immediate input feedback
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');
  
  // Debounce the search term to avoid spamming the API
  const debouncedSearch = useDebounce(searchInput, 500);

  const filters: LeadFilters = {
    page: parseInt(searchParams.get('page') || '1', 10),
    limit: parseInt(searchParams.get('limit') || '10', 10),
    status: searchParams.get('status') || undefined,
    source: searchParams.get('source') || undefined,
    sort: (searchParams.get('sort') as 'latest' | 'oldest') || 'latest',
    search: debouncedSearch || undefined,
  };

  const { data, isLoading } = useLeads(filters);
  const { mutate: exportLeads, isPending: isExporting } = useExportLeads();

  const handleExport = () => {
    exportLeads(
      filters,
      {
        onSuccess: (response) => {
          exportToCsv(response.data, 'leads-export', [
            { header: 'Name', accessor: (l) => l.name },
            { header: 'Email', accessor: (l) => l.email },
            { header: 'Status', accessor: (l) => l.status },
            { header: 'Source', accessor: (l) => l.source },
            { header: 'Date Added', accessor: (l) => new Date(l.createdAt).toLocaleDateString() },
          ]);
        },
      }
    );
  };

  // Sync debounced search to URL
  useEffect(() => {
    updateFilters('search', debouncedSearch);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const updateFilters = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    
    // Reset to page 1 on any filter change (except pagination itself)
    if (key !== 'page') {
      newParams.set('page', '1');
    }
    
    setSearchParams(newParams);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Leads Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Manage and track your leads efficiently.</p>
        </div>
        <div className="flex items-center space-x-3 flex-shrink-0">
          <Button variant="outline" onClick={handleExport} isLoading={isExporting}>
            {!isExporting && <Download className="w-4 h-4 mr-2" />}
            Export CSV
          </Button>
          {canCreateLead && (
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="w-5 h-5 mr-2" />
              Create Lead
            </Button>
          )}
        </div>
      </div>

      <LeadsFilters
        search={searchInput}
        onSearchChange={setSearchInput}
        status={filters.status || ''}
        onStatusChange={(v) => updateFilters('status', v)}
        source={filters.source || ''}
        onSourceChange={(v) => updateFilters('source', v)}
        sort={filters.sort || 'latest'}
        onSortChange={(v) => updateFilters('sort', v)}
      />

      <LeadsTable 
        leads={data?.data || []} 
        isLoading={isLoading}
        onEdit={(lead) => setEditLead(lead)}
        onDelete={(lead) => setDeleteLead(lead)}
      />
      
      {data?.meta && data.meta.totalPages > 1 && (
        <LeadsPagination
          currentPage={data.meta.page}
          totalPages={data.meta.totalPages}
          totalRecords={data.meta.total}
          onPageChange={(page) => updateFilters('page', page.toString())}
        />
      )}

      {/* Modals */}
      <CreateLeadModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
      
      <EditLeadModal 
        isOpen={!!editLead} 
        onClose={() => setEditLead(null)} 
        lead={editLead} 
      />
      
      <DeleteLeadModal 
        isOpen={!!deleteLead} 
        onClose={() => setDeleteLead(null)} 
        lead={deleteLead} 
      />
    </div>
  );
};
