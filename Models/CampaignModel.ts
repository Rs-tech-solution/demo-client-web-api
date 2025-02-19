export interface CampaignType {
  id: number;
  title: string;
  imageSrc: string;
  description: string;
  shortDesc: string;
  code: string;
  status: number | 0;
  approvalDate: Date | null;
  endDate: Date | null;
  requiredAmount: number | 0;
  isActive: boolean | null;
  createdOn: Date | null;
  createdBy: string;
  lastModifiedOn: Date | null;
  lastModifiedBy: string;
}

export type CampaignTypeForList = {
  id: number;
  status: number | 0;
  code: string;
  title: string;
  imageSrc: string;
  endDate: Date;
  requiredAmount: number;
  procuredAmount: number | 0;
  donorsCount: number | 0;
};

export type NgoCampaignsType = {
  id: number;
  ngoId: number;
  campaignId: number;
};

export type CampaignDetailsType = {
  id: number;
  status: number | 0;
  title: string;
  imageSrc: string;
  shortDesc: string;
  description: string;
  ngoId: number;
  endDate: Date;
  requiredAmount: number;
  category_id: number;
  category_name?: string | '';
};

export type CampaignDonorType = {
  name: string;
  image: string;
  currency: string;
  exchange: number | 1;
  amount: number | 0;
  createdOn: Date;
};

export enum CampaignStatus {
  Created = 0,
  Active = 1,
  Closed = 2
}
