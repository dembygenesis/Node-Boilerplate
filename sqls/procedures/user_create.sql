DROP PROCEDURE IF EXISTS user_create;

DELIMITER $$

CREATE PROCEDURE user_create
(
  p_firstname TEXT,
  p_lastname TEXT,
  p_email TEXT,
  p_mobile_number TEXT,
  p_password TEXT,
  p_user_type_id TEXT,
  p_created_by TEXT
)
BEGIN
  START TRANSACTION;

  -- Damn side effects.
  IF (p_created_by = '') THEN
    SET p_created_by = NULL;
  END IF;

  INSERT INTO `user` (
    `firstname`,
    `lastname`,
    `email`,
    `mobile_number`,
    `password`,
    `user_type_id`,
    `created_by`
  )
  VALUES
    (
      `p_firstname`,
      `p_lastname`,
      `p_email`,
      `p_mobile_number`,
      `p_password`,
      `p_user_type_id`,
      `p_created_by`
    ) ;

    COMMIT;

END $$

DELIMITER ;
