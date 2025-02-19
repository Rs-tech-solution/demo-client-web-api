INSERT INTO 
    users
        (
        name,
        email,
        phoneNumber,
        createdOn,
        isGuest
    )
    VALUES 
        (
        @name,
        @email,
        @phoneNumber,
        @createdOn,
        @isGuest
    );