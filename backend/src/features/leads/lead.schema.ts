import { z } from 'zod';
import { LeadStatus, LeadSource } from './lead.types';

export const createLeadSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email format'),
    status: z.nativeEnum(LeadStatus).optional(),
    source: z.nativeEnum(LeadSource),
  }),
});

export const updateLeadSchema = z.object({
  params: z.object({
    id: z.string().min(24, 'Invalid ID format'),
  }),
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    status: z.nativeEnum(LeadStatus).optional(),
    source: z.nativeEnum(LeadSource).optional(),
  }).refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field is required for update',
  }),
});

export const getLeadSchema = z.object({
  params: z.object({
    id: z.string().min(24, 'Invalid ID format'),
  }),
});

export type CreateLeadDTO = z.infer<typeof createLeadSchema>['body'];
export type UpdateLeadDTO = z.infer<typeof updateLeadSchema>['body'];
