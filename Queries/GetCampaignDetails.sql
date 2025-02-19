SELECT 
  Campaigns.*, 
  campaign_updates.content AS campaignUpdates
FROM Campaigns
LEFT JOIN NgoCampaigns ON NgoCampaigns.campaignId = Campaigns.id
JOIN campaign_updates ON campaign_updates.id = Campaigns.campaign_updates_id
WHERE 
  Campaigns.isActive = 1 
  AND Campaigns.code = @code;
