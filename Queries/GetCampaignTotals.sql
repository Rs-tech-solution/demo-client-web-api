SELECT
  campaignId,
  procuredAmount,
  donorsCount
FROM
  CampaignTotals
WHERE
  campaignId = @id;