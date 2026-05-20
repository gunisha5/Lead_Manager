import { apiClient } from '@/lib/axios';
import { Lead, LeadFilters, PaginatedResponse } from './types';

export const fetchLeads = async (filters: LeadFilters): Promise<PaginatedResponse<Lead>> => {
  const params = new URLSearchParams();
  
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());
  if (filters.status) params.append('status', filters.status);
  if (filters.source) params.append('source', filters.source);
  if (filters.search) params.append('search', filters.search);
  if (filters.sort) params.append('sort', filters.sort);

  const response = await apiClient.get<PaginatedResponse<Lead>>(`/leads?${params.toString()}`);
  return response.data;
};

export const createLead = async (data: Partial<Lead>) => {
  const response = await apiClient.post<{ success: boolean; data: Lead }>('/leads', data);
  return response.data.data;
};

export const updateLead = async ({ id, data }: { id: string; data: Partial<Lead> }) => {
  const response = await apiClient.patch<{ success: boolean; data: Lead }>(`/leads/${id}`, data);
  return response.data.data;
};

export const deleteLead = async (id: string) => {
  const response = await apiClient.delete(`/leads/${id}`);
  return response.data;
};
