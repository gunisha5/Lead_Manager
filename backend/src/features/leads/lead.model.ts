import mongoose, { Schema, Document } from 'mongoose';
import { LeadStatus, LeadSource } from './lead.types';

export interface ILead extends Document {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(LeadStatus),
      default: LeadStatus.NEW,
      index: true,
    },
    source: {
      type: String,
      enum: Object.values(LeadSource),
      required: true,
      index: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Indexes for faster searches and pagination
LeadSchema.index({ email: 1 });
LeadSchema.index({ createdAt: -1 });
LeadSchema.index({ name: 'text', email: 'text' });

export const Lead = mongoose.model<ILead>('Lead', LeadSchema);
