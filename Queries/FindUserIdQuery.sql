SELECT
    id
FROM
    users
WHERE
    email = @email
    AND phoneNumber = @phoneNumber;