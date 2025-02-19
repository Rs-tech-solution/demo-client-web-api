SELECT
  id,
  name,
  imageSrc,
  phoneNumber,
  isGuest
FROM
  Users
WHERE
  phoneNumber = @phoneNumber;