import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/ApiResponse';
import * as leadService from './lead.service';

export const getAllLeads = asyncHandler(async (req: Request, res: Response) => {
  const result = await leadService.getAllLeads(req.query, req.user);
  res.status(200).json(ApiResponse.success('Leads fetched successfully', result.leads, result.meta));
});

export const getLeadById = asyncHandler(async (req: Request, res: Response) => {
  const lead = await leadService.getLeadById(req.params.id as string, req.user);
  res.status(200).json(ApiResponse.success('Lead fetched successfully', lead));
});

export const createLead = asyncHandler(async (req: Request, res: Response) => {
  const lead = await leadService.createLead(req.body, req.user);
  res.status(201).json(ApiResponse.created('Lead created successfully', lead));
});

export const updateLead = asyncHandler(async (req: Request, res: Response) => {
  const lead = await leadService.updateLead(req.params.id as string, req.body, req.user);
  res.status(200).json(ApiResponse.success('Lead updated successfully', lead));
});

export const deleteLead = asyncHandler(async (req: Request, res: Response) => {
  await leadService.deleteLead(req.params.id as string, req.user);
  res.status(200).json(ApiResponse.success('Lead deleted successfully'));
});
