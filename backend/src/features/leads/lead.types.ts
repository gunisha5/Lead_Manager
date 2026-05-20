export enum LeadStatus {
  NEW = 'New',
  CONTACTED = 'Contacted',
  QUALIFIED = 'Qualified',
  LOST = 'Lost',
}

export enum LeadSource {
  WEBSITE = 'Website',
  INSTAGRAM = 'Instagram',
  REFERRAL = 'Referral',
}

export interface PaginationQuery {
  page?: string;
  limit?: string;
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  sort?: 'latest' | 'oldest';
}
