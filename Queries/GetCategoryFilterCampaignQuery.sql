SELECT
  campaigns.id,
  campaigns.status,
  campaigns.code,
  campaigns.title,
  campaigns.imageSrc,
  campaigns.endDate,
  campaigns.requiredAmount,
  campaigns.category_id,
  campaign_category.name as category_name,
  CampaignTotals.procuredAmount,
  CampaignTotals.donorsCount
FROM
  campaigns
   JOIN campaign_category ON campaign_category.id = campaigns.category_id
  LEFT JOIN CampaignTotals ON CampaignTotals.campaignId = campaigns.id
WHERE
  campaigns.isActive = 1
  AND LOWER(campaign_category.name) = LOWER(@category);