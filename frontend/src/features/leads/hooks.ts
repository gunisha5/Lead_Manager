import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchLeads, createLead, updateLead, deleteLead } from './api';
import { LeadFilters, Lead } from './types';
import toast from 'react-hot-toast';

export const useLeads = (filters: LeadFilters) => {
  return useQuery({
    queryKey: ['leads', filters],
    queryFn: () => fetchLeads(filters),
    placeholderData: (previousData) => previousData,
  });
};

export const useCreateLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Lead>) => createLead(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create lead');
    },
  });
};

export const useUpdateLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (args: { id: string; data: Partial<Lead> }) => updateLead(args),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update lead');
    },
  });
};

export const useDeleteLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteLead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete lead');
    },
  });
};

export const useExportLeads = () => {
  return useMutation({
    mutationFn: (filters: LeadFilters) => fetchLeads(filters),
    onError: () => {
      toast.error('Failed to export leads');
    },
  });
};
