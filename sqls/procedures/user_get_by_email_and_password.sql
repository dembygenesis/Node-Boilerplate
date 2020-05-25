DROP PROCEDURE IF EXISTS user_get_by_email_and_password;

DELIMITER $$

CREATE PROCEDURE user_get_by_email_and_password
(
  p_email TEXT,
  p_password TEXT
)
BEGIN
  SELECT
    *
  FROM `user` u
  WHERE 1 = 1
    AND u.email = `p_email`
    AND u.password = `p_password`
  ;
END $$

DELIMITER ;
