import { Lead } from './lead.model';
import { CreateLeadDTO, UpdateLeadDTO } from './lead.schema';
import { PaginationQuery } from './lead.types';
import { AppError } from '../../utils/AppError';
import { UserRole } from '../auth/auth.types';

export const getAllLeads = async (query: PaginationQuery, user: any) => {
  const page = parseInt(query.page || '1', 10);
  const limit = parseInt(query.limit || '10', 10);
  const skip = (page - 1) * limit;

  // Build filter object
  const filter: any = {};
  
  console.log('getAllLeads called with user:', user.id, user.role);

  if (user.role === UserRole.SALES) {
    filter.createdBy = user.id;
    console.log('Applying sales filter:', filter);
  }
  
  if (query.status) filter.status = query.status;
  if (query.source) filter.source = query.source;
  
  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: 'i' } },
      { email: { $regex: query.search, $options: 'i' } },
    ];
  }

  const sortDirection = query.sort === 'oldest' ? 1 : -1;

  const leads = await Lead.find(filter)
    .sort({ createdAt: sortDirection })
    .skip(skip)
    .limit(limit);

  const total = await Lead.countDocuments(filter);

  return {
    leads,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getLeadById = async (id: string, user: any) => {
  const lead = await Lead.findById(id);
  if (!lead) {
    throw new AppError('Lead not found', 404);
  }
  
  if (user.role === UserRole.SALES && lead.createdBy.toString() !== user.id.toString()) {
    throw new AppError('You do not have permission to access this lead', 403);
  }
  
  return lead;
};

export const createLead = async (data: CreateLeadDTO, user: any) => {
  return await Lead.create({
    ...data,
    createdBy: user.id,
  });
};

export const updateLead = async (id: string, data: UpdateLeadDTO, user: any) => {
  const existingLead = await Lead.findById(id);
  if (!existingLead) {
    throw new AppError('Lead not found', 404);
  }
  
  if (user.role === UserRole.SALES && existingLead.createdBy.toString() !== user.id.toString()) {
    throw new AppError('You do not have permission to update this lead', 403);
  }

  const lead = await Lead.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  
  return lead;
};

export const deleteLead = async (id: string, user: any) => {
  const existingLead = await Lead.findById(id);
  if (!existingLead) {
    throw new AppError('Lead not found', 404);
  }
  
  if (user.role === UserRole.SALES && existingLead.createdBy.toString() !== user.id.toString()) {
    throw new AppError('You do not have permission to delete this lead', 403);
  }

  await Lead.findByIdAndDelete(id);
  return null;
};
