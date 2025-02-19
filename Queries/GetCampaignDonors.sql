-- SELECT
--   CASE
--     WHEN transactions.anonymous = 1 THEN 'Anonymous'
--     ELSE coalesce(billing.displayName, users.name)
--   END name,
--   CASE
--     WHEN transactions.anonymous = 1 THEN NULL
--     ELSE users.imageSrc
--   END image,
--   transactions.currency,
--   transactions.exchange,
--   transactions.createdOn,
--   Sum(orders.amount) amount
-- FROM
--   Transactions
--   JOIN orders ON transactions.id = orders.transactionId  
--   JOIN campaigns ON orders.campaignId = campaigns.id   
--   JOIN users ON users.id = transactions.userId
--   LEFT JOIN billing ON billing.userId = users.id
-- WHERE
--   transactions.status = 1
--   AND campaigns.code = @code
-- GROUP BY 
--   transactions.id, transactions.anonymous, billing.displayName, users.name, users.imageSrc, transactions.currency, transactions.exchange, transactions.createdOn;

SELECT
  CASE
    WHEN transactions.anonymous = 1 THEN 'Anonymous'
    ELSE coalesce(billing.displayName, users.name)
  END name,
  CASE
    WHEN transactions.anonymous = 1 THEN NULL
    ELSE users.imageSrc
  END image,
  transactions.currency,
  transactions.exchange,
  transactions.createdOn,
  Sum(orders.amount) amount
FROM
  Transactions
JOIN 
  orders ON transactions.id = orders.transactionId  
JOIN
   users ON users.id = transactions.userId
LEFT JOIN
   billing ON billing.userId = users.id
WHERE
  transactions.status = 1
  AND Orders.campaignId = @id
GROUP BY 
  transactions.id, transactions.anonymous, billing.displayName, users.name, users.imageSrc, transactions.currency, transactions.exchange, transactions.createdOn;