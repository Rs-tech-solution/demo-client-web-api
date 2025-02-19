import { executeQuery } from './ConnectionService.js';
import {
  CampaignTypeForList,
  CampaignDetailsType,
  CampaignDonorType,
  CampaignStatus,
} from '../Models/CampaignModel.js';
import { CampaignTotalsType } from '../Models/CampaignTotalsModel.js';

enum campaignQuery {
  GetCampaignList = 'GetCampaignList.sql',
  GetCampaignDetails = 'GetCampaignDetails.sql',
  GetCampaignTotals = 'GetCampaignTotals.sql',
  GetCampaignDonors = 'GetCampaignDonors.sql',
  CountDonors = 'CountDonorsQuery.sql',
  GetCategoryFilterCampaign = 'GetCategoryFilterCampaign.sql',
}

export const getList = async (status: string) => {
  const { data } = await executeQuery(campaignQuery.GetCampaignList);
  const campaignList = (data as CampaignTypeForList[]) || [];

  switch (status?.toLocaleLowerCase()) {
    case 'active':
      return campaignList.filter(
        (campaign) => campaign.status === CampaignStatus.Active
      );

    case 'closed':
      return campaignList.filter(
        (campaign) => campaign.status === CampaignStatus.Closed
      );

    case 'all':
      return campaignList.filter((campaign) =>
        [CampaignStatus.Active, CampaignStatus.Closed].includes(campaign.status)
      );

    default:
      return campaignList;
  }
};

export const getDetails = async (code: string) => {
  const { data } = await executeQuery(campaignQuery.GetCampaignDetails, {
    code,
  });

  return (data as CampaignDetailsType[])?.[0];
};

export const getTotals = async (id: number) => {
  const { data } = await executeQuery(campaignQuery.GetCampaignTotals, { id });
  // const { data } = await executeQuery (campaignQuery.CountDonors , {id})
  return (data as CampaignTotalsType[])?.[0];
};

export const getCampaignTotalDonation = async (code:string) => {
  const { data } = await executeQuery (campaignQuery.CountDonors, {code});
  return (data as CampaignTotalsType[])?.[0];
}

export const getDonors = async (id: number) => {
  const { data } = await executeQuery(campaignQuery.GetCampaignDonors, { id });
  return (data as CampaignDonorType[]) || [];
};

export const getCategoryFilterCampaign = async (category: string) => {
  const { data } = await executeQuery(campaignQuery.GetCategoryFilterCampaign, {category});

  const campaignList = (data as CampaignTypeForList[]) || [];
  return campaignList;
}