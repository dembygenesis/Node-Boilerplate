DROP PROCEDURE IF EXISTS user_get_by_email;

DELIMITER $$

CREATE PROCEDURE user_get_by_email
(
  p_email TEXT
)
BEGIN
  SELECT
    *
  FROM `user` u
  WHERE 1 = 1
    AND u.email = `p_email`;
END $$

DELIMITER ;
