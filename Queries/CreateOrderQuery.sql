INSERT INTO
    orders
        (
        campaignId,
        transactionId,
        amount,
        createdOn
    )
    VALUES
        (
        @campaignId,
        @transactionId,
        @amount,
        @createdOn
    );