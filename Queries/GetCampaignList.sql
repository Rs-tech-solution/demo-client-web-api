SELECT
  Campaigns.id,
  Campaigns.status,
  Campaigns.code,
  Campaigns.title,
  Campaigns.imageSrc,
  Campaigns.endDate,
  Campaigns.requiredAmount,
  campaigns.category_id,
  CampaignTotals.procuredAmount,
  CampaignTotals.donorsCount
FROM
  Campaigns
  LEFT JOIN CampaignTotals ON CampaignTotals.campaignId = Campaigns.id
WHERE
  Campaigns.isActive = 1;