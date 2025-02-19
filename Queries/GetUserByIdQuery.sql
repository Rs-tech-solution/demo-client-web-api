SELECT
  id,
  name,
  imageSrc,
  email,
  phoneNumber
FROM
  Users
WHERE
  id = @id;