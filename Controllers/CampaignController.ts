import { ProductTypeForList } from '../Models/ProductModel.js';
import { ControllerAction } from '../Helpers/Types.js';
import {
  CampaignTypeForList,
  CampaignDetailsType,
  CampaignDonorType,
} from '../Models/CampaignModel.js';
import { CampaignTotalsType } from '../Models/CampaignTotalsModel.js';
import * as campaignService from '../Services/CampaignService.js';

export const getList: ControllerAction<
  { status: string },
  CampaignTypeForList[]
> = async (context) => {
  const { status } = context.params;

  return await campaignService.getList(status);
};

export const getDetails: ControllerAction<
  { code: string },
  CampaignDetailsType
> = async (context) => {
  const { code } = context.params;

  return await campaignService.getDetails(code);
};

export const getTotals: ControllerAction<
  { id: number },
  CampaignTotalsType
> = async (context) => {
  const { id } = context.params;

  return await campaignService.getTotals(id);
};

export const getCampaignTotalDonation: ControllerAction<
 { code: string },
  CampaignTotalsType
> = async (context) => {
    const {code} = context.params;
    return await campaignService.getCampaignTotalDonation(code)
}

export const getDonors: ControllerAction<
  { id: number },
  CampaignDonorType[]
> = async (context) => {
  const { id } = context.params;

  return await campaignService.getDonors(id);
};

export const getCategoryFilterCampaign: ControllerAction<
{ category: string },
CampaignTypeForList[]
> = async (context) => {
  const { category } = context.params;
  
  return await campaignService.getCategoryFilterCampaign(category);
};

export const getCampaignProducts: ControllerAction<
 { id: number },
 ProductTypeForList[]
> = async (context) => {
  const {id} = context.params;
  return await campaignService.getCampaignProducts(id);
}