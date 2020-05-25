DROP PROCEDURE IF EXISTS user_get_by_id;

DELIMITER $$

CREATE PROCEDURE user_get_by_id
(
  p_id TEXT
)
BEGIN
  SELECT
    *
  FROM `user` u
  WHERE 1 = 1
    AND u.id = `p_id`;
END $$

DELIMITER ;
