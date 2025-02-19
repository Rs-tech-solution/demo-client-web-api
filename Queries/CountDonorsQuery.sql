SELECT 
    COUNT(DISTINCT transactions.userId) AS donorsCount,
    SUM(orders.amount) AS procuredAmount,
    campaigns.code,
    campaigns.id as campaignId
FROM 
    transactions
JOIN
    orders ON transactions.id = orders.transactionId
JOIN
    campaigns on orders.campaignId = campaigns.id
WHERE
    campaigns.code = @code;
