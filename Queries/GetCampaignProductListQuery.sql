SELECT
    campaign_products.id,
    products.id AS product_id,
    products.name,
    products.amount,
    products.quantity,
    products.image,
    products.description
FROM
    campaign_products
    JOIN products ON products.id = campaign_products.product_id
WHERE
    campaign_products.campaign_id = @id;