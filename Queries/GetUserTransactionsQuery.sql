SELECT
  trn.id AS transactionId,
  campaign.code AS campaignCode,
  campaign.title AS campaignTitle,
  ordr.amount,
  trn.created AS transactionDate
FROM
  Transactions trn
  INNER JOIN Orders ordr ON trn.id = ordr.transactionId
  INNER JOIN Campaigns campaign ON ordr.campaignId = campaign.id
WHERE
  trn.userID = @userId
  AND trn.status = 1
ORDER BY
  trn.created ASC;