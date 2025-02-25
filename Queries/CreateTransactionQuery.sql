INSERT INTO
    transactions
        (
        userId,
        reference,
        amount,
        tipAmount,
        anonymous,
        currency,
        exchange,
        createdOn,
        status
    )
    VALUES
        (
        @userId,
        @reference,
        @amount,
        @tipAmount,
        @anonymous,
        @currency,
        @exchange,
        @createdOn,
        @status
    );