Update
  Users
SET
  name = @name,
  email = @email,
  lastModifiedOn = @lastModifiedOn,
  lastModifiedBy = @lastModifiedBy
WHERE
  id = @id;